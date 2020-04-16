## Table of Contents

[Introduction](#intro)

### <a name="intro"></a> Introduction
This directory contains several custom utilities spanning myriad domains, among them scripting, validation, general I/O applications, and web plugins.
These utilities are first built in a generalized, 'boilerplate' manner; they are each later expounded upon, in some cases to such a degree that I have published them (e.g. the [pynotes command-line utility](https://github.com/MatthewZito/py_notes), or the [putlocker userscript](https://github.com/MatthewZito/utils/blob/master/web-utils/putlockerstyle.js)).

They may be of use to you. Otherwise, I store these programs and scripts here so as to facilitate the aggregation thereof into a scalable, portable library of personal computing utilities. I use them as remote modules quite a bit.

For the remainder of this documentation, I will discuss the more interesting (in my opinion, anyway) among these tools, outlining their design, usage, and implementation theory. If you would like to know more about a program I have yet to document with such a degree of granularity, do let me know and I will add it to this README.

# How it Works: Extensive Password Validation w/SHA1, SHA256, MD5 ([pass_validator.py](https://github.com/MatthewZito/utils/blob/master/scripting/pass_validator.py))

The validator is interesting and I'm pleased with my implementation. Passwords get leaked all the time. My validator accepts as input your actual passes. It first encrypts the pass with SHA1, or MD5 if we are checking against your wireless network (perhaps someone captured a 4-way handshake and has the MD5 hash to your network). Then, the validator strips the hashed pass to five chars, and makes an API call to HaveIBeenPwnd?, perhaps the most robust open database of broken passes. 

We strip to five chars because we don't actually want to make an API request that submits our actual full pass to the remote service. What happens, then, is the API validates against the first five chars of our hashed pass. Then, it returns all matches, which we loop through and match against our full pass (we store the tail in a local variable). This way, actual full pass validation is done locally in our cache. Passes only exist for the session.

# How it Works: Automated Data Monitoring ([monitor.sh](https://github.com/MatthewZito/utils/blob/master/web-utils/monitor.sh))

Monitor is a dynamic-input shell script which is intrinsically quite simple but in execution readily subject to the whims of UNIX, cron, and processes. I wrote Monitor after DD missed another record release from her favorite musician. I thought "let's just make a cron job that monitors the page for updates."

Okay, admittedly my first idea was that maybe I could directionally DDOS them or something to clog up their server's threads (leaving a few for me to choose from). This has several obvious flaws, notable among them that it is illegal and per my ethic improper and unethical computing. It's also patently ridiculous and absurd. Time to get serious...

It'd be simple to just utilize `curl` or `wget` (I went with the superior-qua-this-purpose `curl`) to pull the page source as it exists at time of execution, write it in a variable, and subsequently do the same into a second variable at regular intervals, comparing the two on each iteration. If the two vars are the same (the source hasn't changed), open a stream and `cat` var two into var one. We can dump any errors along the way to our friendly neighborhood black hole, `/dev/null`. We repeat this check at intervals configured such that we aren't slamming the webpage with GET requests (we'd know - the source would become a timeout page). 

Now, when the two vars do not eval to true, we use `sendEmail` to email ourselves an alert. Excellent. No worrying about coordinating timezones and missing the next vinyl release :D The moment Bladee releases a new record, we'll know before everyone and the newsletter. Of course, this script has many wonderful use-cases that I intend to endeavor upon.

Note the two variables are instantiated in the home directory as `old.html` and `new.html`. It is preferable to run this script as a cron job; we can push it into the bg and check it periodically. We can do this with `nohup ./monitor.sh &`.

# Security and Penetration Testing Suite
There is, in the web utilities directory (/web-utils), a sub-directory dedicated to pen-testing tools. These programs should only be used for research purposes, and never an illegal capacity.

That said, let's explore how some of these programs I wrote work:

## How it Works: MAC Address Changer

MAC (Media Access Control) is a permanent, physical, and unique address assigned to network interfaces by device manufacturers. This means even your wireless card, for instance, has its own unique MAC address.

The MAC address, akin to an IP on the internet, is utilized within a network in order to facilitate the proper delivery of resources and data (i.e. packets). An interaction will generally consist of a source MAC and a destination MAC. MAC addresses can identify you, be filtered, or otherwise access-restricted.

Important to note is these unique addresses are not ephemeral; they are persistent and will remain associated with a device were a user to install it in another machine. But they don't have to be inextricably intertwined...




