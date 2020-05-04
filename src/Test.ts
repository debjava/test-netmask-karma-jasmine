import { IPUtility } from "./ip-utility";

console.log("Hello .........");
const ipUtil: IPUtility = new IPUtility();
//const checkFlag: boolean = ipUtil.isIPInSubnetRange("10.0.8.10","10.0.0.0/12");
//const checkFlag: boolean = ipUtil.isIPInSubnetRange("10.8.0.10","10.0.0.0/12");
const checkFlag: boolean = ipUtil.isIPInSubnetRange("192.168.1.20","10.0.0.0/12");
console.log("Is IP in Range: ", checkFlag);