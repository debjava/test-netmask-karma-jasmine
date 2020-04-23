import { IPUtility } from "./ip-utility";

describe("IPUtility", () => {

    let ipUtil: IPUtility = new IPUtility();

    beforeEach(() => {
        ipUtil = new IPUtility();
    });

    it('should provide a number from ip address', () => {
        expect(ipUtil.getIPAddress2Number("1.2.3.4")).toBe(16909060);
    });

    it('should provide IP address from number', () => {
        expect(ipUtil.number2IPAddress(16909060)).toBe("1.2.3.4");
    });

    it("should IP address be in range", () => {
        let checkIP: string = "192.168.1.20";
        let subnetMask: string = "128.0.0.0";
        expect(ipUtil.isIPInSubnetRange(checkIP, subnetMask)).toBeTruthy();
    });

    it("should IP address be in range for subnet mask with CIDR prefix", () => {
        let checkIP: string = "192.168.1.20";
        let subnetMask: string = "128.0.0.0/1";
        expect(ipUtil.isIPInSubnetRange(checkIP, subnetMask)).toBeTruthy();
    });

    it("should generate a range of IP addresses", () => {
        let checkIP: string = "192.168.1.20";
        let subnetMask: string = "128.0.0.0";
        let totalIPs2Generate = 1024;

        let generatedIPs: string[] = ipUtil.getRangeOfIPAddress(checkIP, subnetMask, totalIPs2Generate);
        expect(generatedIPs.length).toBe(1024);
    });

    it("should throw error for a range of IP addresses for ip address not in range", () => {
        let checkIP: string = "1.2.3.4";
        let subnetMask: string = "255.255.255.252";
        let totalIPs2Generate = 1024;

        expect(function() {
            ipUtil.getRangeOfIPAddress(checkIP, subnetMask, totalIPs2Generate);
        }).toThrow(new RangeError(checkIP + '  is not in subnetmask ' + subnetMask + ' range, use a proper IP address'));
    });

    it("should generate a range of 2 IP addresses", () => {
        let checkIP: string = "255.255.255.252";
        let subnetMask: string = "255.255.255.252";
        let totalIPs2Generate = 1024;

        let generatedIPs: string[] = ipUtil.getRangeOfIPAddress(checkIP, subnetMask, totalIPs2Generate);
        expect(generatedIPs.length).toBe(3);
    });

    it("should throw error for a range of 2000 IP addresses", () => {
        let checkIP: string = "1.2.3.4";
        let subnetMask: string = "255.255.255.252";
        let totalIPs2Generate = 2000;

        expect(function() {
            ipUtil.getRangeOfIPAddress(checkIP, subnetMask, totalIPs2Generate);
        }).toThrow(new RangeError('Out of range'));
    });

    it("should IP address 20.118.166.255 be not in range", () => {
        let checkIP: string = "20.118.166.255";
        let subnetMask: string = "255.255.255.240";
        expect(ipUtil.isIPInSubnetRange(checkIP, subnetMask)).toBeFalse();
    });

    it("should throw error for a range of IP addresses for ip address 20.118.166.255 not in range", () => {
        let checkIP: string = "20.118.166.255";
        let subnetMask: string = "255.255.255.240";
        let totalIPs2Generate = 10;

        expect(function() {
            ipUtil.getRangeOfIPAddress(checkIP, subnetMask, totalIPs2Generate);
        }).toThrow(new RangeError(checkIP + '  is not in subnetmask ' + subnetMask + ' range, use a proper IP address'));
    });

    it("should IP address 255.255.255.255 be not in range", () => {
        let checkIP: string = "255.255.255.255";
        let subnetMask: string = "255.255.255.0";
        expect(ipUtil.isIPInSubnetRange(checkIP, subnetMask)).toBeTrue();
    });

    it("should throw error for a range of IP addresses for ip address 255.255.255.255 not in range", () => {
        let checkIP: string = "255.255.255.255";
        let subnetMask: string = "255.255.255.0";
        let totalIPs2Generate = 4;

        let generatedIPs: string[] = ipUtil.getRangeOfIPAddress(checkIP, subnetMask, totalIPs2Generate);
        expect(generatedIPs.length).toBe(4);

    });

    it("should IP address 10.255.255.255 be in subnet 128.0.0.0 range", () => {
        let checkIP: string = "10.255.255.255";
        let subnetMask: string = "128.0.0.0";
        expect(ipUtil.isIPInSubnetRange(checkIP, subnetMask)).toBeFalse();
    });

    it("should throw error for a range of IP addresses for ip address 255.255.255.255 not in range", () => {
        let checkIP: string = "10.255.255.255";
        let subnetMask: string = "128.0.0.0";
        let totalIPs2Generate = 4;

        expect(function() {
            ipUtil.getRangeOfIPAddress(checkIP, subnetMask, totalIPs2Generate);
        }).toThrow(new RangeError(checkIP + '  is not in subnetmask ' + subnetMask + ' range, use a proper IP address'));

    });


});