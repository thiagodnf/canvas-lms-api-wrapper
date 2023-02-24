import axios from 'axios';

class CanvasApiUtils {

    static API = "https://canvas.flint.umich.edu/api/v1/"

    static COURSE_ID = process.env.CANVAS_COURSE_ID || -1;

    static API_TOKEN = process.env.CANVAS_API_TOKEN || "";

    static HEADERS = {
        headers: {
            "Authorization": `Bearer ${CanvasApiUtils.API_TOKEN}`
        },
    }

    static createOrUpdatePages(fileName, body) {

        const data = {
            wiki_page: {
                body: body
            }
        };

        const  url = `${CanvasApiUtils.API}/courses/${CanvasApiUtils.COURSE_ID}/pages/${fileName}`

        axios.put(url,
            data, CanvasApiUtils.HEADERS
        ).then(function (response) {
            // console.log(response);
        }).catch(function (error) {
            // console.log(error);
        });
    }
}

export default CanvasApiUtils;
