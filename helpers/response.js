
class response {
    badValues(res) {
        return res.status(400).json({ message: 'Bad Values' });
    }
    notFound(res, message) {
        return res.status(404).json({ message });
    }
    notAuthorized(res, message) {
        return res.status(403).json({ message });
    }
    success(res, data, message) {
        return res.status(200).json({ message: message, data: data });
    }
    errorInternal(res, error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
    sessionExpired(res) {
        return res.status(401).json({ message: "You've been logged in from some other device. Please login again" });
    }
    message(res, status, message) {
        return res.status(status).json({ message });
    }

}
response = new response();
module.exports = response;