# Monitrum

Monitrum is user and developer friendly platform that provides trustless and permissionless transaction monitoring solution along with support for Forced Inclusion on Arbitrum.

[![Submisstion Video](https://youtu.be/Gwusru4qUA0/0.jpg)](https://youtu.be/Gwusru4qUA0)


<img width="1792" alt="Screenshot 2024-03-17 at 10 57 47" src="https://github.com/prathamesh-mutkure/eth-london-frontend/assets/28570857/0723d68d-a2a9-4666-b894-6ddcffd9c97e">


## About

The main aim of Monitrum is to improve user and developer experience around the Arbitrum network by automating manual tasks, providing transaction monitoring, network downtime alerts, data analysis and much more!

One of the known issues with Arbitrum is settling transactions between L1 and L2 during sequencer downtime, which needs manual user intervention and advanced knowledge of the underlying network and protocols, which makes it difficult for new users to work with Arbitrum in critical times, this problem is solved using the process of "Forced Inclusion" which currently is an manual and highly technical process. We created a web application that automated this process in a censorship-resistant manner that enables users to focus on what matters rather than worrying about problems like sequencer downtime.

We also created a dashboard for users to monitor their accounts and wallets for transactions, contract interactions, funds and other similar data, thus helping users analyse their network interaction trends and make decisions to optimize their operations.

We also added functionality of email alerts for developers, so that network downtimes and critical situations don't go unnoticed for a long time and can be fixed as soon as possible.

Thus our project improves the overall developer experience, reduces manual work and the need for constant human monitoring, enables founders to focus on their product, and a smooth user experience even for users without much technical knowledge of how things work under the hood.

The automation tools can be accessed through our web app, docker images or even our soon-to-be-published npm package for users to customise the automation process based on their needs.

## How we made it

Our project combines technologies for users to choose from based on their needs, the foremost tool being our web application that provides transaction monitoring, UI-based automation for Forced Inclusion and a dashboard for analytics and metrics related to user activity on Arbitrum Network. This web has been developed using Next.js, TypeScript and TailwindCSS. The reason for choosing Next.js was its server and client-side optimization which makes it faster than other technologies with a vast developer community for support.

The Next.js app is powered by a Node.js and Express.js backend which powers all our automation support using CRON jobs and critical alert service using Nodemailer and Gmail.

The automated scripts have been written with the help of Arbitrum SDK and TypeScript, all the above services are integrated with multiple wallets like MetaMask using libraries like ThirdWeb and Ethers.

We have used docker to containerize the scripts and other tools for developers to quickly get started and customise the tools based on their needs.

All the live alerts, feeds and communication is powered Sockets and RPC calls between different services, frontend and backend which are constantly running in the background monitoring the network and running CRON jobs for alerts.


## Tech Stack

### Frontend

- Next.js
- TypeScript
- TailwindCSS
- WebSockets
- ThirdWeb & Ethers

### Backend

- Node.js
- Express.js
- Cron
- Nodemailer

### NPM Package

- Arbitrum SDK
- Ethers
- Arbitrum Nitro & Token Bridge

### ETHGlobal Submission

- [Project Page](https://ethglobal.com/showcase/monitrum-mctia)
