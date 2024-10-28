const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname , 'db.json'));
const middlewares = jsonServer.defaults();

// Use default middlewares (logger, static, cors, etc.)
server.use(middlewares);

// Custom routes
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
    res.jsonp({locationName:location.name,properties:paginatedHouses , results:resultCount , totalPages:totalPages});
  
  }else if(city){
    const housesByLocation = houses.filter((h)=>h.cityId == city?.id).map((h)=>({...h,location:city}))
    const paginatedHouses = housesByLocation.slice(startIndex , endIndex);
    const resultCount = housesByLocation.length
    
    const types = ['appartement','garage','maison']; 
    const results = {
      total:housesByLocation.length,
    }

    types.forEach((t)=>{
      results[t] = 0;
    })

    housesByLocation.forEach((p)=>{
      results[p.type] = results[p.type]+1;
    })
    
    const totalPages = Math.ceil(resultCount/limit);
    res.jsonp({locationName:city.name,properties:paginatedHouses , results , totalPages:totalPages});
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


server.get('/property', (req, res,next) => {
  const propertySlug = req.query.slug;
  const withRelated = req.query.withRelated;

  

  const property = router.db.get('houses').find({slug:propertySlug}).value()



  if(property){
    const propertyLocationId = property.locationId;
    const propertyCityId = property.cityId;
    
    let location;
    if(propertyLocationId){
      location = router.db.get('locations').find({id:property.locationId}).value(); 
    }else{
      location = router.db.get('cities').find({id:property.cityId}).value(); 
    }

    if(withRelated==false){
      return res.jsonp({property , locationName:location.name , locationSlug:location.slug});
    }

    const relatedProperties = router.db.get('houses').filter((p)=>{
      return (p.cityId == location.id || p.locationId == location.id) && p.id != property.id;
    })

    return res.jsonp({property, relatedProperties , locationName:location.name , locationSlug:location.slug});
  
  }
  else{
    res.status(404).jsonp({error:'Location not found'})
  }

});


// Use the default router for other routes
server.use(router);

// Start server
server.listen(4000, () => {
  console.log('JSON Server is running');
});