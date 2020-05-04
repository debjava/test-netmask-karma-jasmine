# Check IP Address with Subnetmask using Node with Karma Jasmin unit testing & code coverage

This is an example project which performs the followings

* Check whether a particular IP address is in a subnet mask range
* Generate a range of IP address from an initial IP address, subnetmask and range
* It uses Jasmine unit testing framework

# How to run and test

Use the following command to test.

`yarn install && yarn build && yarn test`

If you want to simply test with some data, I have provided as `Test.ts` file where you can enter the data.
You can use the following commmand to run.

`yarn install && yarn build && yarn start`


# Technicalities
Refer to the class `ip-utility.ts`. Exported class name is `IPUtility`

Refer to the script docs for the following.

`isIPInSubnetRange(ipAddress: string, subnetMask: string)`

The above method provides the information in boolean type whether IP address is in subnet mask range or not.

`getRangeOfIPAddress(initialIPAddress: string, subnetMask: string, range: number)`

The above method provides an array of IP addresses for a range with initial IP address, subnet mask and the number of IP addresses to generate.


# Comments
Since I am using Karma Jasmin for test framework, you can refer to the class `test-utility.spec.ts` for various test cases.

# Author
Debadatta Mishra (deba.java@gmail.com)

# References
Check the links for subnet calculation online.

* [List of Global Subnet mask](https://docs.netgate.com/pfsense/en/latest/book/network/understanding-cidr-subnet-mask-notation.html)

* [List of subnet as per wikipedia](https://en.wikipedia.org/wiki/Wildcard_mask)

* [Subnet mask cheat sheet](http://droptips.com/cidr-subnet-masks-and-usable-ip-addresses-quick-reference-guide-cheat-sheet)

* [IP Calculator](http://jodies.de/ipcalc)

* [IPADDRESSGUIDE CIDR to IPv4 Conversion](https://www.ipaddressguide.com/cidr)

* [Good Link - Subnet Calculator](https://8gwifi.org/SubnetFunctions.jsp)

* [IP Subnet Calculator](https://www.calculator.net/ip-subnet-calculator.html)

* [random ip generator](https://onlinerandomtools.com/generate-random-ip)

* [Subnet Calculator](https://www.tunnelsup.com/subnet-calculator/)

* [Advanced Subnet Calculator Tool](https://www.solarwinds.com/free-tools/advanced-subnet-calculator)

* [Subnet Calculator (IPv4 Only)](https://www.iplocation.net/subnet-calculator)