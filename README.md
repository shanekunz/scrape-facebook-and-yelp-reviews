# Scrape Facebook and Yelp Reviews for your Business

A nodejs script that allows you to scrape positive reviews of your business from facebook and yelp.

## How it works
You download the pages you want to scrap using browser dev tools. The reason for this is to grab any data dynamically loaded on the client side. You then run the program against the HTML files, and out will come SQL insert statements you can put in a database. You can also upload the avatar images to something like Azure storage or S3 AWS buckets to grab the images on a production site.

## Steps to use
- Run `npm i` on the project.
- Go to the yelp and facebook website. Navigate to your businesses page. Open Network tab in dev tools. Refresh page and click on first request. Copy the Request headers to your clipboard.
- Create a `.facebook-headers.env` and a `.yelp-headers.env` file and paste the respective headers. They should should something like this:
```
	Host = yelp.com
	Connection = keep-alive
	...
```
- Next, back in the dev tools of your browser, copy the root `<html>` page from the inspector and put the contents in HTML files within the `/html_src` folder. Yelp hides a lot of reviews that don't meet their arbitrary standards so you'll have to copy a second page after clicking "# other reviews that are not currently recommended" on the reviews page.
- Feel free to change the scraping logic with the `/src` folder.
- You can add more websites to scrape in the the `main.js` file.
- When you you're all setup, generate the SQL insert statements and download avatar images by running `npx nodemon index.js`. Everything will be put in the `/output` folder.
	- The SQL is in Microsoft SQL Server style, but you can tweak this within the `/src` folder.
