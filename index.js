const { useLocation } = require('wouter')

const Router = (isLogged, publicRoutes, privateRoutes, publicHomeRoute, privateHomeRoute, NotFound) => {
	const [location, setLocation] = useLocation()
	if (location === '/') {
		if (isLogged) setLocation(privateHomeRoute)
		setLocation(publicHomeRoute || '/login')
	}
	if (Object.keys(publicRoutes).some(route => route === location)) {
		if (isLogged) setLocation(privateHomeRoute)
		return publicRoutes[location]
	}
	if (Object.keys(privateRoutes).some(route => route === location)) {
		if (isLogged) return privateRoutes[location]
		return publicRoutes['/login'] // should it call setLocation? it would force url path to be /login
	}
	return NotFound
}

module.exports = Router