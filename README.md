# Welcome to the Contacts App

This application is created to store user contacts.
It is very easy to view and make editing

# Structure and feature

This application consists of 2 pages.
The first page is a list of contacts (list of names). This page implements:
• pagination
• search
• sorting
• delete contacts
• adding contacts (implemented using a modal window)

When you click on a contact, you go to the next page with detailed information about the user.
It shows the contact's name and a list of all his numbers. You can change any information, you can add and delete phone numbers.

In the form of editing and creating a new contact, data validation is implemented:
all fields must be filled in, and the phone number must be recorded according to the following pattern. +380759004123

Once all the fields are filled in correctly, the button will become active.
To save all changes on the server you need to click on the create/edit button

*It is only front-end part of the app, so you can use it only with server part
