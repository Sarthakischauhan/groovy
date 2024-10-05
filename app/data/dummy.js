const money = {
    "001" : {
        "currentBalance": {
            "chase": 1247,
            "total": 1247,
        }, 
        "currentCredit": {
            "discover": 319, 
            "chase": 667,
            "total":  986,
        }, 
        "userName": "Sarthak Chauhan",
    } 
}
const expenses = [
    {
      name: "Rent",
      type:"Living",
      amount: 1200,
      necessary: true,
      datePosted: "2023-04-01"
    },
    
    {
      name: "Philz Coffee",
      type:"Coffee",
      amount: 4.65,
      necessary: true,
      datePosted: "2023-04-02"
    },

    {
      name: "Philz Coffee",
      type:"Coffee",
      amount: 4.65,
      necessary: true,
      datePosted: "2023-04-03"
    },


];

export default {money, expenses};