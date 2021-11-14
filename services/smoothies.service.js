

class SmoothiesService {
    Index = (request, response) => {
        return response.render('smoothies', { title: "Smoothies" });
    }
}

module.exports = new SmoothiesService();