# **TV Shows on Netflix, Prime Video, Hulu, and Disney+**

Vidhi Bhargava

Dataset: [https://www.kaggle.com/ruchi798/tv-shows-on-netflix-prime-video-hulu-and-disney](https://www.kaggle.com/ruchi798/tv-shows-on-netflix-prime-video-hulu-and-disney)

## **Overview**

The goal of this project was to create at least three different visualizations from a publicly available dataset. The dataset that I chose to make visualizations of was entitled “TV Shows on Netflix, Prime Video, Hulu, and Disney+”. After going through the data, I chose to create the following types of visualizations: a bar chart, a line graph, and a pie chart. I felt that these types of visualizations would allow me to display data in a clear and concise manner, while still granting a degree of creative freedom to make the data interesting to viewers.

![alttext](https://github.com/vidhibhar/Tv-Visualization/blob/95659eeaf566891a0a9e0f14d3ad969b4c0dc14b/thumbnail.PNG)

## **Data Description**

The dataset contains a variety of information regarding TV shows and their availability on the aforementioned streaming platforms. Specifically, the dataset includes over 5300 show listings, the year each show was released, their age rating, the streaming platforms each show is available on, and each show’s critical scores from both Rotten Tomatoes and IMDb. This dataset was found on the Kaggle website. I downloaded the dataset from its webpage (link is listed above) and proceeded to include it in the repository.
The team realized early on that Rotten Tomatoes and IMDb grade shows differently. Whereas Rotten Tomatoes scores are out of one hundred, IMDb scores out of ten and uses one decimal place to indicate nuance. To keep the visualizations simple and consistent, the IMDb scores of each show were converted to be out of one hundred to match those of Rotten Tomatoes.

## **Goals and Tasks**

As previously mentioned, the designated goal for this project was to create a webpage with at least three distinct visualizations using a publicly available dataset. As soon as I agreed upon a dataset, I proceeded to narrow down the ideas as to what types of visualizations would be ideal for the types of data included in it. Once the three types of graphs were chosen, work was divided equally through out the deadline. I worked on the bar chart, the line graph, and the pie chart one by one. Once all three charts were created, I worked to implement them into a single HTML page. From there, I worked to improve the graphs, adding more complex features such as the ability to swap between IMDb and Rotten Tomatoes scores on the line and bar graphs and the ability to remove streaming platforms in the pie chart.

## **Idioms**

The final product of the project contains three distinct visualizations: a bar chart, a line graph, and a pie chart. The bar chart shows the critical scores of the top ten shows across all streaming platforms. As previously mentioned, these scores are out of one hundred. The user has the ability to toggle between Rotten Tomatoes and IMDb scores. This enables the user to view the differences between the results of Rotten Tomatoes scoring system and those of IMDb’s scoring system on a small scale. For example, one can see that Breaking Bad has a noticeably higher rating than Avatar: The Last Airbender on Rotten Tomatoes, whereas switching to IMDb on the dropdown menu reveals that the movie database ranks the two more similarly.

The line graph is perhaps the most complex of the three visualizations. Like the bar chart, the line graph draws data from the IMDb and Rotten Tomatoes scores of every show. However, two factors make this visualization significantly more unique than the previous chart. First, the scores of TV shows are compiled by year and then averaged. Second, the line graph has an additional dropdown menu that allows the user to view the average yearly show ratings by streaming platform. The user can view the exact values of both IMDb and Rotten Tomatoes scores for a specific year if they hover their mouse over a point on the graph. Both IMDb and Rotten Tomatoes lines are shown simultaneously. The end result is a graph that enables a user to see the differences among a wide variety of shows, dividing them by both the year they were released and the streaming platforms they can watch them on. From this, they can then narrow down which streaming platform has a better library of shows overall.

Finally, the pie chart shows the total number of shows per platform and compares them with each other. Unlike the other charts, however, this chart was not created in D3. Instead, it was created using a Chart.js functionality, a difference that was approved by Dr. Bryan during the team’s live demo. There is an added function to this pie chart that affects the other graphs. When a streaming platform is selected on the pie chart, the bars on the bar chart will change color if they are available on that plaftorm, and the line graph will change to show the average yearly scores of that platform. While this graph on its own does not reveal anything about show ratings or the quality of the shows available on each platform, it does show the size of each platform’s streaming library. This, combined with the small scale review of the differences between rating databases presented by the bar chart and the large scale review of the library quality displayed by the line graph, can help a user decide upon what streaming platforms will give them the most bang for their buck. 


## **Reflection**

Not much changed in regard to the content of my project between the initial proposal and the final product. I did not go back on their choice of dataset for the project, and no revisions were made to the choice of visualization methods. However, the bar chart did change in the manner in which data was being presented. Specifically, in the proposal, the bar chart was shown as displaying the number of shows per platform in the top one hundred according to IMDb and Rotten Tomatoes ratings. However, this was changed very early on in the project to instead show the top ten shows across all platforms and show how they were rated differently between IMDb and Rotten Tomatoes. I felt that the former design communicated much of the same ideas as the line graph and did not add much to the presentation of the dataset. So, I decided to narrow the bar chart’s focus to only show a handful of shows so that the chart would reflect on the rating databases instead of the streaming platforms. While this may seem counterintuitive to what I was trying to communicate, I felt that giving the user some initial insight into the differences between the two rating websites would help them make a more informed decision about what streaming platforms are best.

