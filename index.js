import express from 'express';
import axios from 'axios'

const app = express();
const PORT = 3000;

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
        


app.listen(PORT, () => {
    console.log(`server runing at ${PORT}`)
})