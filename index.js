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

const Router2 = (isLogged, publicRoutes, privateRoutes, Login, NotFound) => {
	const [location] = useLocation()
	const isPrivateRoute = Object.keys(privateRoutes).some(route => route === location)
	const isPublicRoute = Object.keys(publicRoutes).some(route => route === location)
	if (isLogged && isPrivateRoute && !isPublicRoute) return privateRoutes[location]
	if (isLogged && isPrivateRoute && isPublicRoute) return privateRoutes[location]
	if (isLogged && !isPrivateRoute && isPublicRoute) return publicRoutes[location]
	if (isLogged && !isPrivateRoute && !isPublicRoute) return NotFound
	if (!isLogged && isPrivateRoute && !isPublicRoute) return Login
	if (!isLogged && isPrivateRoute && isPublicRoute) return publicRoutes[location]
	if (!isLogged && !isPrivateRoute && isPublicRoute) return publicRoutes[location]
	if (!isLogged && !isPrivateRoute && !isPublicRoute) return NotFound
}

module.exports = { Router, Router2 }