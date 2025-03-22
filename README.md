# Opal – A Loom Clone

Opal is a real-time video recording and sharing application inspired by [Loom](https://www.loom.com). Built using modern web technologies like **Next.js**, **TypeScript**, **TailwindCSS**, **Electron**, **Express**, and hosted on **AWS**, this project offers a complete solution for capturing, editing, and sharing screen recordings. It also integrates with **Stripe** for subscription-based payments.

> **Note:** For a detailed walkthrough of the project and its architecture, check out the [17-hour video tutorial](https://youtu.be/3R63m4sTpKo?si=XGiIQCVmeuCI3vG-) which explains every step of the development process.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Features

- **Real-Time Video Recording:** Capture your screen with minimal latency.
- **Screen Sharing:** Instantly share recordings in real time.
- **Cross-Platform Desktop App:** Available as a downloadable executable (.exe) for Windows.
- **Responsive UI:** Built with TailwindCSS for a modern and mobile-friendly design.
- **Subscription Payments:** Integrated with Stripe for handling subscriptions.
- **Full-Stack Integration:** Combines a Next.js front end with an Express backend, all hosted on AWS.

---

## Architecture

Opal is divided into two main parts:

1. **Frontend:**

   - **Next.js & TypeScript:** For building dynamic user interfaces and server-side rendering.
   - **TailwindCSS:** For rapid and responsive UI development.
   - **Electron:** Wraps the web app into a desktop application.

2. **Backend:**
   - **Express:** Provides RESTful APIs for managing recordings, user sessions, and payments.
   - **AWS:** Utilized for scalable media storage and processing.
   - **Stripe:** Manages subscription and one-time payments.

---

## Installation

You have two options to get started with Opal:

1. **Web Version:**  
   Visit our hosted version at:  
   [Opal](https://opal.vercel.app)

2. **Desktop Application (Windows):**  
   Download the installer (.exe) from our release page:  
   [Download Opal for Windows](https://opal.example.com/download)  
   After downloading, simply double-click the `.exe` file and follow the on-screen instructions to install the application.

---

## Usage

- **Web Version:**  
  Open your browser and navigate to [https://opal.example.com](https://opal.example.com). Sign in or create an account to start recording and sharing your videos in real time.

- **Desktop Application:**  
  Once installed, launch the application from your desktop. The app provides a user-friendly interface to capture your screen and share videos directly. It will also automatically check for updates and notify you when a new version is available.

---

## Configuration

Customize your settings by reviewing the configuration files located in the `config` folder. This includes:

- AWS configurations for scalable media storage and processing.
- Stripe integration settings for handling subscriptions and payments.
- Other environment variables necessary for both frontend and backend operation.

---

## Contributing

Contributions are welcome! To contribute:

1. **Fork the Repository**
2. **Create a Feature Branch:**
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Commit Your Changes:**
   ```bash
   git commit -m "Add some feature"
   ```
4. **Push to Your Branch:**
   ```bash
   git push origin feature/YourFeature
   ```
5. **Open a Pull Request:**
   For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the [MIT License](https://en.wikipedia.org/wiki/MIT_License)

---

## License by Web Prodigies

This project is licensed for educational use only. For commercial use, a license must be purchased. You can obtain the license here: [Code License](https://webprodigies.com/license)

---

## Usage Guidelines by Web Prodigies

Here are a few examples of how you can and cannot use the code:

- **To learn? ✅**
- **To build a portfolio? ✅**
- **To get a job? ✅**
- **To run as a business? ❌**
- **To run as a SaaS? ❌**
- **Any form of income through the code? ❌**
- **To resell? ❌**
- **To create content? ❌**
- **To claim it fully as your own? ❌**

These are just a few examples, and there may be more situations where the code usage is restricted you can read the agreement on the website. This code is provided strictly for learning purposes. If you wish to use our code for any commercial purposes, please purchase a license here: [Code License](https://webprodigies.com/license).

---

## Acknowledgments

- [Loom](https://www.loom.com) for inspiring this project.
- The Creators of **Next.js**, **Electron**, **TailwindCSS**, **Express**, and **Stripe** for their amazing tools.
- The [Video Tutorial](https://youtu.be/3R63m4sTpKo?si=XGiIQCVmeuCI3vG-) by Web Prodigies for the in-depth development guide.
