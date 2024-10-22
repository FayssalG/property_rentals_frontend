const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname , 'db.json'));
const middlewares = jsonServer.defaults();

// Use default middlewares (logger, static, cors, etc.)
server.use(middlewares);

// Custom route
server.get('/houses-by-location/:locationSlug', (req, res,next) => {
  const locationSlug = req.params.locationSlug;
  const location = router.db.get('locations').find({slug:locationSlug}).value();
  const city = router.db.get('cities').find({slug:locationSlug}).value();
  
  const houses = router.db.get('houses').value()

  const page = parseInt(req.query._page, 10) || 1;  
  const limit = parseInt(req.query._limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  if(location){
    const housesByLocation = houses.filter((h)=>h.locationId == location?.id).map((h)=>({...h,location}))
    const paginatedHouses = housesByLocation.slice(startIndex , endIndex);
    const resultCount = housesByLocation.length
    const totalPages = Math.ceil(resultCount/limit);
    res.jsonp({properties:paginatedHouses , results:resultCount , totalPages:totalPages});
  
  }else if(city){
    const housesByLocation = houses.filter((h)=>h.locationId == city?.id).map((h)=>({...h,location:city}))
    const paginatedHouses = housesByLocation.slice(startIndex , endIndex);
    const resultCount = housesByLocation.length
    const totalPages = Math.ceil(resultCount/limit);
    res.jsonp({properties:paginatedHouses , results:resultCount , totalPages:totalPages});
  }
  else{
    res.status(404).jsonp({error:'Location not found'})
  }

});

server.get('/locations-autocomplete' , (req , res , next)=>{
  const regex = new RegExp(req.query.name_like,'i')
  const locations = router.db.get('locations').filter((l)=>{
    return regex.test(l.name)
  }).value();
  const cities = router.db.get('cities').filter((l)=>{
    return regex.test(l.name)
  }).value();
  

    res.jsonp(
        [
          ...cities,
          ...locations.map((location)=>{
            return {...location , city:router.db.get('cities').find({id:location.cityId})}
          })
        ]
    )
})

// Use the default router for other routes
server.use(router);

// Start server
server.listen(4000, () => {
  console.log('JSON Server is running');
});