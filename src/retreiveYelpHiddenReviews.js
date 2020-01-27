import {fs,R,S,cheerio,util} from '../common';
const url = require('url'); // built-in utility
const request = require('request');
var path = require("path");

export function retreiveYelpHiddenReviews(result){
  const res = fs.readFileSync(`C:/Users/Shane/Desktop/github-by-stars/html_src/YelpHiddenReviews_1-26-2020.html`, { encoding: 'utf-8' })
  const $ = cheerio.load(res)
  var els = $(`div.review`).toArray()

  var reviews = [];
  var userNames = [];
  var userImgIndex = 1;
  els.map((el, index) => {
    const userImg = $('img.photo-box-img', el)[0].attribs.src;
    reviews.push($('.review-content p', el).text());
    var userName = $('.user-display-name', el).first().text().replace('.', '');
    userNames.push(userName);
    process.stdout.write(".");
    if (/^https?:\/\//.test(userImg)) {
      var img_name = path.basename(url.parse(userImg).pathname);
      img_name = img_name.split('?')[0];
      request.get({url: userImg, encoding: 'binary', headers: result}, function (err, response, body) {
        fs.writeFile("./output/imgs/user_review_img_"+ (userName.replace(/\s+/g, ' ').trim().replace(' ', '_')) +'.jpg', body, 'binary', function(err) {
          if(err)
            console.log(err);
          else {
            console.log("The file was saved!");
          }
        }); 
      });
    }
  });
  var rstring = '';
  reviews.forEach(r => {
    rstring += r.replace(/^\n|\n$/g, '').trim();
  });
  var content = reviews.map(function(line, index){
    return `(${index+1}, '${line.replace(/\s+/g, ' ').trim().replace(`’`, `''`).replace(`“`, '"').replace(`”`, '"').replace(/\'+/g, `'`).replace(/\'/g, `''`)}', '${userNames[index].replace(/\s+/g, ' ').trim()}', 'Yelp'),\n`;
  }).filter(Boolean).join('');
  var contentClean = reviews.map(function(line, index){
    return `Yelp Name: "${userNames[index].replace(/\s+/g, ' ').trim()}" | Positive Comment: "${line.replace(/\s+/g, ' ').trim()}"\n`;
  }).filter(Boolean).join('');
  var sql_statement = `INSERT INTO UserReview (UserId, ReviewText, UserName, Source)
  VALUES ${content};`
  fs.writeFile("./output/add_yelp_hidden_user_reviews.sql", sql_statement, function(err) {
    if(err)
      console.log(err);
    else
      console.log("The text was saved!");
  }); 
  fs.writeFile("./output/yelp_hidden_reviews_cleaned.txt", contentClean, function(err) {
    if(err)
      console.log(err);
    else
      console.log("The text was saved!");
  }); 
};