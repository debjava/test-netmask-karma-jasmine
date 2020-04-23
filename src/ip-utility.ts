import { Netmask } from "netmask";

/** 
  * A utility class to verify the following
  * 1. To check whether an IP address is in a subnet mask range or not
  * 2. To generate a range of IP address based upon initial IP address and subnet mask
  * @author Debadatta Mishra
 */
export class IPUtility {

    private readonly MAX_NUM: number = 2000;

    /** Function to get the fixed CIDR subnet mask prefix
      * All CIDR prefix and subnet mask mentioned here are fixed
      * Refer the link: https://www.calculator.net/ip-subnet-calculator.html
      * @argument subnetIP of type string
     */
    private getCIDRPrefix(subnetIP: string): string {
        let subnetPrefixMap = new Map();
        subnetPrefixMap.set("255.255.255.255", "32");
        subnetPrefixMap.set("255.255.255.254", "31");
        subnetPrefixMap.set("255.255.255.252", "30");
        subnetPrefixMap.set("255.255.255.248", "29");
        subnetPrefixMap.set("255.255.255.240", "28");
        subnetPrefixMap.set("255.255.255.224", "27");
        subnetPrefixMap.set("255.255.255.192", "26");
        subnetPrefixMap.set("255.255.255.128", "25");
        subnetPrefixMap.set("255.255.255.0", "24");
        subnetPrefixMap.set("255.255.254.0", "23");
        subnetPrefixMap.set("255.255.252.0", "22");
        subnetPrefixMap.set("255.255.248.0", "21");
        subnetPrefixMap.set("255.255.240.0", "32");
        subnetPrefixMap.set("255.255.224.0", "19");
        subnetPrefixMap.set("255.255.192.0", "18");
        subnetPrefixMap.set("255.255.128.0", "17");
        subnetPrefixMap.set("255.255.0.0", "16");
        subnetPrefixMap.set("255.254.0.0", "15");
        subnetPrefixMap.set("255.252.0.0", "14");
        subnetPrefixMap.set("255.248.0.0", "13");
        subnetPrefixMap.set("255.240.0.0", "12");
        subnetPrefixMap.set("255.224.0.0", "11");
        subnetPrefixMap.set("255.192.0.0", "10");
        subnetPrefixMap.set("255.128.0.0", "9");
        subnetPrefixMap.set("255.0.0.0", "8");
        subnetPrefixMap.set("254.0.0.0", "7");
        subnetPrefixMap.set("252.0.0.0", "6");
        subnetPrefixMap.set("248.0.0.0", "5");
        subnetPrefixMap.set("240.0.0.0", "4");
        subnetPrefixMap.set("224.0.0.0", "3");
        subnetPrefixMap.set("192.0.0.0", "2");
        subnetPrefixMap.set("128.0.0.0", "1");

        return subnetPrefixMap.get(subnetIP);
    }

    /** Function to get CIDR prefix based upon the subnet mask
      * You can pass the following types of subnet mask <br>
      * Type-1: 128.0.0.0/1
      * 
      * Type-2: 128.0.0.0
      * All are acceptable as per the function
      * @param subnetMask of type string
     */
    private getCidrPrefixIPAddress(subnetMask: string): string {
        let indexValue: number = subnetMask.indexOf("/")
        let subnetMaskCIDRPrefix = "";
        if (indexValue === -1) {
            // console.log("Does not contain prefix, find the prefix");
            let prefix: string = this.getCIDRPrefix(subnetMask);
            subnetMaskCIDRPrefix = subnetMask + "/" + prefix;
        } else {
            // console.log("Contains prefix, directly pass for validation");
            subnetMaskCIDRPrefix = subnetMask;
        }
        return subnetMaskCIDRPrefix;
    }

    /** Function to calculate IP address to number.
      * It will be long type number.
      * @param ipAddress of type string
     */
    public getIPAddress2Number(ipAddress: string): number {
        let result = 0;
        let parts: string[] = ipAddress.split('.');
        parts.forEach((octet) => {
            result <<= 8;
            result += parseInt(octet, 10);
        });
        return result >>> 0;
    }

    /** Function to generate IP address from a number
      * Pass a long type number to get the IP address
      * @param numIP of type number
     */
    public number2IPAddress(numIP: number): string {
        return [numIP >>> 24, numIP >> 16 & 255, numIP >> 8 & 255, numIP & 255].join('.');
    }

    /** Function to check whether IP address is in a
      * subnet mask range
      * @param ipAddress of type string
      * @param subnetMask of type string
      * @returns(boolean)
     */
    public isIPInSubnetRange(ipAddress: string, subnetMask: string) {
        let subnetMaskCIDRPrefix = this.getCidrPrefixIPAddress(subnetMask);
        console.log("Actual Subnet with CIDR Prefix: ", subnetMaskCIDRPrefix);
        let block = new Netmask(subnetMaskCIDRPrefix);
        console.log("First IP: ", block.first);
        console.log("Last IP: ", block.last);
        console.log("Total IPs: ", block.size);
        let isInRange: boolean = block.contains(ipAddress)

        return isInRange;
    }

    /** Function to provide a range of IP address with the 
      * initial IP address, subnet mask and total IPs to generate
      * @param initialIPAddress of type string
      * @param subnetMask of type string
      * @param range of type number
     */
    public getRangeOfIPAddress(initialIPAddress: string, subnetMask: string, range: number): string[] {
        if (range === this.MAX_NUM) {
            throw new RangeError(
                'Out of range'
            );
        }
        if (!this.isIPInSubnetRange(initialIPAddress, subnetMask)) {
            throw new RangeError(
                initialIPAddress + '  is not in subnetmask ' + subnetMask + ' range, use a proper IP address'
            );
        }
        let rangeIPs: string[] = [];
        let subnetMaskCIDRPrefix = this.getCidrPrefixIPAddress(subnetMask);
        let block = new Netmask(subnetMaskCIDRPrefix);
        let lastIPAddress: string = block.last;
        let initialIPNumber: number = this.getIPAddress2Number(initialIPAddress);
        //console.log("getIPAddressInLong() : ", initialIPNumber);
        for (let i = 0; i < range; i++) {
            let tempValue = initialIPNumber + i;
            //Convert to IP address
            let ip: string = this.number2IPAddress(tempValue);
            if (ip === lastIPAddress) {
                rangeIPs.push(ip);
                break;
            } else {
                rangeIPs.push(ip);
            }

        }
        return rangeIPs;
    }

}