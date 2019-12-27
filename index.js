const Router = (location, isLogged, publicRoutes, privateRoutes, notFound) => {
	if(Object.keys(publicRoutes).some(route => route === location))
		return publicRoutes[location]
	if(Object.keys(privateRoutes).some(route => route === location)) {
		if (isLogged) return privateRoutes[location]
		else return publicRoutes['/login']
	}
	return notFound
}

module.exports = Router