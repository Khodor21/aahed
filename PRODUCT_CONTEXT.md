# Ahd (عهد) — Project Context & Product Vision

The project is an application called **"Ahd" (عهد)**.

We have already started implementing the foundational parts of the project, as you can see in the existing codebase. Before continuing to build new features, fully understand the project's purpose, vision, and current ideas so that this context is consistently used when answering future questions and helping implement the application.

## 1. Project Overview

**Ahd** is an application designed to help young participants track and maintain their **Qur'an review (Muraja'ah) programs**.

The core concept is based on a monthly review cycle:

* Every month, each student records the Qur'an portion they intend to review during that month.
* The monthly review portion must be **at least one Juz' of the Qur'an**.
* At the end of each month, there is an extended review session where all students meet with their teachers/sheikhs.
* During this session, each student recites their assigned review portion to the sheikh.
* The sheikh can then evaluate the student's performance and provide a score and/or notes.

The overall goal of Ahd is to provide a **simple, sustainable, motivating, and useful experience** that helps students maintain consistency with their Qur'an review and allows them to clearly track their progress over time.

The product is **not 100% finalized yet**. The ideas below represent the main concepts discussed so far. The application should remain flexible enough to evolve and accommodate additional features later.

---

## 2. Main Application Areas

### Profile Page

The profile page could contain information such as:

* Student's name
* Profile picture
* Position/role in the scouting organization
* Current month's review goal
* Achievements accumulated over previous months
* Monthly review history
* Teacher's evaluation for each month's recitation
* Evaluation score out of 10
* Teacher's notes/comments from the recitation session, when available

These are the initial ideas for the profile page.

**When helping design or implement this page, feel free to suggest additional features that would genuinely improve the student's experience, motivation, or understanding of their progress.**

---

### Monthly Review Plan

There should be a dedicated page for managing and tracking the student's **monthly Qur'an review portion**.

The student should be able to divide their monthly portion into:

* Daily goals
* Weekly goals

A key detail is that **each Qur'an Juz' consists of 20 pages** in our system.

Therefore, we can create a standardized mechanism that takes the student's monthly review portion and automatically divides it into reasonable:

* Daily targets
* Weekly targets

The student should be able to:

* See what they are expected to review each day
* Mark the daily target as completed
* Track their progress throughout the current month
* See their overall monthly completion percentage/progress
* Understand whether they are currently on track
* Be informed when they are falling behind
* See when they need to catch up and how much they are behind

The objective is not simply to display a checklist, but to give the student a clear sense of:

> "Where should I be today, and am I currently on track to complete my monthly goal?"

**When helping design or implement this page, suggest additional features that can make progress tracking clearer and more useful without making the experience unnecessarily complicated.**

---

### Events Page

There should be a dedicated **Events** page.

Supervisors/admins may create different types of events, for example:

* Extended Qur'an review sessions
* Review meetings
* Trips
* Outings
* Scout activities
* Other relevant activities

Students should be able to:

* View upcoming events
* See event details
* Understand the date and time
* View the location when applicable
* See any additional information provided by the organizers

For example, if supervisors schedule an extended review session on a particular day, students should be able to open the event and see all relevant information.

The Events section should remain flexible enough to support different types of activities in the future.

**When helping design or implement this page, suggest useful additions that improve event discovery, preparation, and participation.**

---

### Notifications Page

There should be a dedicated **Notifications** page.

Notifications can be either general or user-specific.

**General notifications**, for example:

* A new event has been created
* An important announcement has been published
* A change affecting all students has been made

**Personal notifications**, for example:

* Reminder to complete today's review goal
* Reminder that the student is falling behind
* Reminder about an upcoming review session
* Notification that a teacher has submitted an evaluation
* Other useful progress-related reminders

The notification system should eventually distinguish between general announcements and personalized reminders where appropriate.

---

## 3. Home Page

The Home page has not been fully defined yet.

The most useful **mobile dashboard/home experience** should ideally give the student an immediate understanding of their current status without requiring them to navigate through multiple pages.

For example, it could potentially include:

* Today's review goal
* Today's completion status
* Current monthly progress
* Whether the student is on track or behind
* Remaining pages for the current month
* Upcoming event
* Latest teacher evaluation
* Recent achievements
* Quick actions
* Relevant reminders

However, these are only initial ideas — do not assume all of these elements must be included. Analyze the overall product and suggest what would make the home page genuinely useful while keeping it simple and focused.

---

## 4. Product Philosophy

### Simplicity
The student should be able to understand what they need to do without unnecessary complexity.

### Consistency
The app should encourage students to maintain their Qur'an review habit throughout the month.

### Progress Visibility
Students should always have a clear understanding of their current progress and whether they are on track.

### Motivation
Achievements, progress indicators, evaluations, and other elements should encourage consistency without turning the application into an overly gamified experience.

### Long-term Use
The experience should remain useful month after month, allowing students to look back at their history and development.

### Useful Information
Every element of the UI should have a clear purpose. Avoid adding features simply because they look visually appealing.

---

## 5. Design & Technical Constraints

### Existing Design System

**Always respect the existing project design system.** This includes existing variables, colors, fonts, typography, spacing, components, design patterns, and conventions in the codebase.

Do **not** introduce arbitrary new colors, fonts, variables, or design patterns when an existing project convention can be reused.

Before suggesting or implementing something new, first look at how the project already handles similar things and follow the established approach.

### Mobile-First Scope

For the current phase, **Ahd is a mobile-only application**. The primary target is mobile phone screens.

Do not prioritize desktop or large-screen layouts at this stage. When designing components or pages:

* Think about mobile usability first
* Optimize layouts for narrow screens
* Avoid unnecessarily complex desktop-oriented layouts
* Make interactions comfortable for touch
* Keep information hierarchy clear on small screens

Desktop responsiveness can be considered later when the project scope expands.

---

## 6. How to Assist With This Project

When asked to build a page, create/modify a component, design a feature, suggest UX improvements, structure data, define APIs, create database models, improve an existing implementation, fix a bug, review code, suggest architecture, or add a new feature — first consider how the request fits into the overall **Ahd product vision** described above.

Do not treat each request as an isolated feature. Maintain consistency between the different parts of the application.

For example, if the Monthly Review page is built, its progress data should make sense alongside the Home page, Profile page, Notifications, and future teacher evaluation features.

Likewise, if a new concept is introduced such as achievements, reminders, progress states, or review history, consider how that concept could integrate naturally with the rest of the application.

---

## 7. Important: The Product Is Still Evolving

The ideas described above are **not final requirements** — they represent the current understanding of the product.

If a missing important feature, a UX problem, a better way to structure a feature, a potential edge case, a better information hierarchy, a data relationship not yet considered, or a way to simplify the experience is identified, point it out and explain the reasoning.

However, do not unnecessarily expand the scope or add complexity. The goal is to build a **focused and useful product first**, while keeping the architecture flexible enough for future additions.

---

## 8. Core Mental Model

The simplest way to understand Ahd is:

**Student → Monthly Qur'an Review Goal → Daily/Weekly Progress → Monthly Recitation Session → Teacher Evaluation → Historical Progress**

The application should help connect these stages into one continuous experience.

A student should be able to answer, at any moment:

1. What is my goal this month?
2. What should I review today?
3. Am I on track?
4. If I am behind, how much do I need to catch up?
5. When is my next review session?
6. How did I perform in previous months?
7. What did my teacher say about my performance?
8. How have I progressed over time?

This is the core product concept that should guide future development.

**Note: all text should be in the Arabic language throughout the project.**
