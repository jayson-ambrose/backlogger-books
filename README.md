# Backlogger Books App

Backlogger Books is a mobile application for avid readers to track the next books they want to read. The app also provides a space to read and record reviews placed by other users. Users can add books to thier backlog and mark whether the books have been completed or not. They can search the open library database for books by Author, Title or ISBN to read reviews or add the books to thier backlog. The app also features a barcode scanner which can be used to quickly backlog or find reviews for a book if they are at the book store or library.

# Instructions

## Landing Screen

To get started with Backlogger Books, create an account by tapping "Sign-Up" on the initial landing screen. Once the account is created, the user should be automatically logged in. If you already have an account, you can log in with the provided fields.

## Search

The search function can be used without logging in or creating an account. The search page has a pop-up menu to select whether to search Authors, Titles or ISBN numbers. You can access this menu by tapping the triangle at the upper right corner of the screen. Once selected, type your query into the field and click 'Search'. A scrolling field will appear below with books that match your query. Tap on 'Details' for any result to check reviews or backlog the book.

## Scan Barcode

Use your phone's camera to scan the barcode on the back of a book. If the book is found in the open library database, it's details page will be loaded automatically, if available.

## Account Details

You can view your chosen favorite author and book title as well as a list of books for which you have submitted reviews. From here you can also change your password or delete your account permanently. Deleting your account will also delete your backlog and any reviews that you have posted on Backlogger Books.

## Backlog

From the backlog, you can view details pages for each book you have saved. You can also mark whether you have completed each book or not by clicking the toggle switch for each entry. The backlog can be filterred by whether a book has been marked as completed or not. It can also be filterred by title by typing a title name in the text-field near the top of the page.

# Roadmap

## Known Issues
 
- Some barcodes will not scan properly or will return incorrect results. This is usually caused by poor quality barcodes or other barcodes in the camera view. It can also mean that the book was not found in the open library database.

- Some books do not display images in search results, backlogs or details pages. This is usually because the edition ISBN is new or no image has been submitted for that book in the open library database.

- When configured for remote database use, the app operates slowly and some selections may take a few seconds to respond. This is due to rate-limits through the remote server.

## Upcoming changes and bug fixes

- Implementation of average rating tracking for display on search and backlog scroll-views.
- Tweaks and fixes for the barcode scanning function to improve its usability.
- General styling improvements.
- Pessimistic rendering for search results, backlogs, logins, and account changes to reduce confusion.
