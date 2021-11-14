class AppService {
    Index = (request, response) => {
        return response.render('home', { title: 'Home' });
    }
}

module.exports = new AppService();