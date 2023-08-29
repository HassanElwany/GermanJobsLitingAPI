import express from 'express';
import axios from 'axios';
import ejs from 'ejs';

const app = express();
const port = 3000;


app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/fetch-jobs", async (req, res) => {
    try {
        const response = await axios.get("https://www.arbeitnow.com/api/job-board-api");
        const result = response.data;
        const jobs = result.data.map(job => ({
            title: job.title,
            companyName: job.company_name,
            remote: job.remote,
            jobType: job.job_types[0],
            jobUrl: job.url
        }));
        res.json(jobs);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'An error occurred' });
    }
});
        


app.listen(process.env.PORT || port, () => {
    console.log(`server running at ${PORT}`)
})