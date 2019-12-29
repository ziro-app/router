const { useLocation } = require('wouter')

const Router = (isLogged, publicRoutes, privateRoutes, homeRoute, NotFound) => {
	const [location, setLocation] = useLocation()
	if (location === '/') {
		if (isLogged) setLocation(homeRoute)
		setLocation('/login')
	}
	if (Object.keys(publicRoutes).some(route => route === location)) {
		if (isLogged) setLocation(homeRoute)
		return publicRoutes[location]
	}
	if (Object.keys(privateRoutes).some(route => route === location)) {
		if (isLogged) return privateRoutes[location]
		return publicRoutes['/login'] // should call setLocation?
	}
	return NotFound
}

module.exports = Router