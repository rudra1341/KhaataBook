const { user } = require("./models/user");

const users = [
  {
    name: "Ravi Sharma",
    email: "ravi.sharma@example.com",
    password: "$2b$10$EkK3yQicmi2F0SiKO4RroONufFuGJ45rLW2prbOLbcuxXbT.irOKm"
  },
  {
    name: "Priya Mehta",
    email: "priya.mehta@example.com",
    password: "$2b$10$pIhxArdxB8RSaDAACQ6vOOF9Obj.AqsZnCZwwiMgulloLyymeNwHm"
  },
  {
    name: "Aman Verma",
    email: "aman.verma@example.com",
    password: "$2b$10$tWA7FW0aoqDJtGu1iUhIZOsAta.o2zJRJcIG9mLDV9u6ShGBpLS1O"
  },
  {
    name: "Neha Yadav",
    email: "neha.yadav@example.com",
    password: "$2b$10$afO90x37scdSEakLvyUBn.tFl.cOYleV8kw2aNdOkc47wOTKJzgdK"
  },
  {
    name: "Deepak Singh",
    email: "deepak.singh@example.com",
    password: "$2b$10$FG7rmXc1hxIZWyRYKAb/lO60HFEH.DrOUY9cJ/7E84VooZTyhezJq"
  },
  {
    name: "Anjali Chauhan",
    email: "anjali.chauhan@example.com",
    password: "$2b$10$9AnbYljQ9Nwqweh.92/OPOPcXXOkfL5uhdVYNRTg6EG8ODsb8.eiO"
  },
  {
    name: "Karan Sethi",
    email: "karan.sethi@example.com",
    password: "$2b$10$l3eG5eg.5gNSlkVfpYvmNe0PJ6V8qARtQkcFJLIkNBM5X6F9XKDGC"
  },
  {
    name: "Sneha Kapoor",
    email: "sneha.kapoor@example.com",
    password: "$2b$10$F3C1XbTieFX0jSjiCG.CUej/8zrkdUAIS3OAYrzMOCnf39WwmCKtm"
  },
  {
    name: "Vikram Thakur",
    email: "vikram.thakur@example.com",
    password: "$2b$10$9zVCw60nLAhbKjsGSOzDrOE/kHj4cxP5ZYY2qzfpKTA23XeNXGKe."
  },
  {
    name: "Isha Agarwal",
    email: "isha.agarwal@example.com",
    password: "$2b$10$t.7vDDcG8vgCU9WZ6bZb4.oeNiOrEJNt3KmH4TiuANnyLWqblcOh6"
  },
  {
    name: "Arjun Desai",
    email: "arjun.desai@example.com",
    password: "$2b$10$p7l0o4LXvRMtZSdQB/LL/eUAOvzENL0vqrpZaVD3W.Zm0mOIccYCm"
  },
  {
    name: "Meena Rani",
    email: "meena.rani@example.com",
    password: "$2b$10$5cURhXOOa8fqLB9lxSXgp.L8QAKqg/QKlhlDPk8pYVu.R1jZkUOzC"
  },
  {
    name: "Tushar Jindal",
    email: "tushar.jindal@example.com",
    password: "$2b$10$HlJgVM89Mv5J1ce1i7r1Me.IBTp/NWbrAKoyAtl28Km3/2JpbdkYK"
  },
  {
    name: "Ritika Jain",
    email: "ritika.jain@example.com",
    password: "$2b$10$Zi3v4llTyIiGW2jrXiRwou1eY/.NrgWW4jbkB1BtN1b2Q/uBDo.TK"
  },
  {
    name: "Mohit Rawat",
    email: "mohit.rawat@example.com",
    password: "$2b$10$pPAoscLIgDG0Pn2lJTj/..tOVcWIuxmtcnAOaAsWDKc8HXKyERXBy"
  }
];
module.exports=users;