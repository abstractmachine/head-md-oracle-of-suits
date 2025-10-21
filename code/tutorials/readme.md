# Physical Computing Workshop
**Lead:** [Douglas Edric Stanley](http://abstractmachine.net/biography)  
**Dates:** October 20–23, 2025  
**Program:** [Master Media Design](https://www.hesge.ch/head/en/programs-research/master-arts-media-design), [HEAD – Genève](https://www.hesge.ch/head/en)

- [Setup](./setup.md)
- [Hello Robot!](./hello-robot.md)
- [Coding Fundamentals](./coding.md)
- [Bibliography](./bibliography.md)

## Overview
This one-week intensive four-day workshop-within-a-workshop — *workshopception* — introduces the creative use of code for designing [interactive, gesture-based experiences](https://abstractmachine.net/tutorials). It takes place within the larger [Oracle of Suits](https://github.com/abstractmachine/head-md-oracle-of-suits) project and focuses on building a shared foundation for **real-time interaction**, **machine vision**, and **AI-assisted coding**.

The week combines fundamentals of “creative coding” with hands-on prototyping using [P5.js](https://p5js.org/), [MediaPipe](https://developers.google.com/mediapipe), and [GitHub Copilot](https://docs.github.com/en/copilot).

## Goals

1. **Establish a Shared Technical Foundation**  
   Ensure all participants can set up their environment with [VS Code](https://code.visualstudio.com/), [P5.js](https://p5js.org/), and [MediaPipe](https://developers.google.com/mediapipe), and run sketches in a browser.

2. **Create a Simple, Fluid Interactive Demo**  
   Develop a minimal prototype that expresses a **core gesture-based interaction** (hand, body, or face), implemented through concise, human-readable code.

3. **Learn to Code Collaboratively with AI**  
   Use [GitHub Copilot](https://docs.github.com/en/copilot) as an educational coding assistant — learning to prompt, debug, and refactor collaboratively with AI tools.

4. **Master the Basics of Creative Coding**  
   - Variables and proportions  
   - Classes and objects  
   - Dynamic arrays  

   By the end of Day 1, everyone should be able to write a basic [P5.js](https://p5js.org/) sketch using these fundamentals.

5. **Explore Visual and Design Language Fundamentals**  
   Develop sensitivity to **point, line, circle, shape, color, contrast, and grid** as the visual grammar of generative design.

6. **Scale from Simple Systems to Complex Structures**  
   Learn how to expand small sketches into modular, expressive compositions while maintaining clarity and control.

7. **Design Through Gesture and Movement**  
   Treat the human body (hands, face, posture) as input — a source of rhythm, feedback, and interaction — using real-time camera-based tracking.

8. **Make It Dynamic and Playful**  
   Move beyond dry, infographic-style “information” that no one ever reads.
   Create playful environments with minimal UI, where the interactions themselves **transmit meaning** through feedback loops of motion, reaction, and froms generated through code.

## Method

This is an **experimental workshop**. It will be based on collective back-and-forth exploration between teacher and students — we will **discuss, code, demo, question, and debug** various sources, exercises, and goals. We will improvise, often. There is no fixed course structure.

The second core methodology will be what we call **“Talking to Robots.”**  
This is a general theoretical framework for the entire master’s programme, but for this workshop it can be taken quite literally: we will build a workflow where students treat “vibe coding” as a starting point and then push it toward intentional, strategic collaboration — integrating AI assistants into a coherent **design + methodology + tool + process** framework.

Finally, we will lean heavily on using `git` commits for note-taking, and sharing code and demos with one another. Every student should feel comfortable by the end of the week pushing code up into their repository. We will project various student code repositories onto the room beamer so we can collectively comment, debug, and learn from each other.

## Desired Outcomes

By the end of the week, each participant (or small group) should be able to produce a **simple interactive prototype** that demonstrates:
- a real-time gesture or motion-based input
- clean, readable code that could be scaled or reused in future iterations of the *Oracle of Suits* project
- the ability to collaborate with the `Copilot` robot
- the ability to describe the core fundamentals of the code architecture

This list might seem a tall ask, but given current student progress, it seems entirely achievable

## Tools

- [Git](https://en.wikipedia.org/wiki/Git)  
- [GitHub](https://github.com)  
- [P5.js](https://p5js.org/) — primary creative coding framework  
- [MediaPipe](https://developers.google.com/mediapipe) — hand, body, and face landmark detection  
- [VS Code](https://code.visualstudio.com/) — main development environment  
- [GitHub Copilot](https://docs.github.com/en/copilot) — AI coding assistant  
- [ml5.js](https://ml5js.org/) — optional machine learning layer for P5.js  
- [Processing](https://processing.org/) — historical foundation of the P5.js framework

## Bibliography

A starter [bibliography](./bibliography.md) has been created for students wanting to dig deeper into various subjects explored in this workshop-within-a-workshop.

## Setup
Following the [Processing](http://processing.org) tradition of creating a `setup()` function at the startup of a program, we have created a [setup.md](./setup.md) checklist for you to follow in order to get your environment setup correctly.

## Talking To Robots
Once you have set up your environment, a cheat sheet with tips on talking to robots — [hello-robot.md](./hello-robot.md) has been created for you to get you started working with your new robot ~~overlords~~ collaborators.

## Quickstart
Code can be daunting. This is an extemely fast-ramp into the basics of writing a powerful P5.js program: [coding.md](./coding.md).

## Media Pipe Demos
[Pierre Rossel](https://github.com/prossel) has created a series of online interactive [P5.js + MediaPipe demos](https://prossel.github.io/Oracle-of-suits-demos/). You can find the source-code of his demos on his github repository [Oracle-of-suits-demos](https://github.com/prossel/Oracle-of-suits-demos).