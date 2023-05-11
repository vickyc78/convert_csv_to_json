const connect = require('../config/dbConfig');
const User = connect.user
const Op = connect.Sequelize.Op;

module.exports = {

    /**
     * This function will create the user.
     * @param null
     * @returns age as a classification
     */
    async createConsumer() {
        try {
            var fs = require("fs");

            var data = fs.readFileSync(process.env.FILEPATH);
            var stringData = data.toString();
            
            var arrayOne = stringData.split('\r\n');
            var header = arrayOne[0].split(',');
            let arrayObj=this.creatingObject(arrayOne,header)
            
            console.log(arrayObj);
           
            await this.saveUsersInformation(arrayObj)

            return await this.classificationOnAge()
            
        } catch (err) {
            console.error('Error whil creating consumer::' + err);
            throw new Error(err)
        }
    },

    creatingObject(arrayOne,header){
        var jArray = [];
        for (let i = 1; i < arrayOne.length - 1; i++) {
        
            var obj = {};
            var myNewLine = arrayOne[i].split(',');

            for (let j = 0; j < header.length; j++) {
                if (header[j].includes('.')) {
                    let mainKey = header[j].split('.')
                    if (!obj[mainKey[0]]) {
                        obj[mainKey[0]] = {}
                    }
        
                    obj[mainKey[0]][mainKey[1]] = myNewLine[j]
        
        
                } else {
                    var headerText = header[j];
                    var valueText = myNewLine[j];
                    obj[headerText] = valueText;
                }
            };
            jArray.push(obj);
        };
        return jArray
    },

    async saveUsersInformation(arrayObj){
        let k=0
            do {
                let userObj={
                    name:arrayObj[k].name.firstName+" "+arrayObj[k].name.lastName,
                    age:arrayObj[k].age,
                    address:arrayObj[k].address,
                    additional_info:arrayObj[k]
                }
                let consumerData = await User.create(userObj)
                k++
            } while (k<arrayObj.length);
    },

    async classificationOnAge(){

        //select sum(case when age<20 then 1 end) as "<20",sum(case when age between 20 and 40 then 1 end) as "20 to 40",sum(case when age between 40 and 60 then 1 end) as "40 to 60",sum(case when age>60 then 1 end) as ">60" from public.users 

        let users=await User.findAll()
            let userArray=[{age:"<20",count:0},{age:"20 to 40",count:0},{age:"40 to 60",count:0},{age:"> 60",count:0}]
            users.forEach((user)=>{
                if(user.age<20){
                    userArray[0].count++
                }else if(user.age>=20 && user.age<40){
                    userArray[1].count++
                }else if(user.age>=40 && user.age<60){
                    userArray[2].count++
                }else if(user.age>=60){
                    userArray[3].count++
                }
            })
            console.log("userArray",userArray)
            return userArray
    }
}
