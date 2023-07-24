const express = require('express');
let pieRepo = require('./repos/pieRepo');
let errorHelper = require('./helpers/errorHelpers');

const app = express();

const router = express.Router();

app.use(express.json());

router.get('/', function (req, res, next) {
    pieRepo.get(function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "Successful",
            "data": data
        });
    }, function (err) {
        next(err);
    });
});

// Create GET/search?id=n&name=str to search for pies by 'id' and/or 'name'
router.get('/search', function (req, res, next) {
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };

    pieRepo.search(searchObject, function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "Successful",
            "data": data
        });
    }, function (err) {
        next(err);
    });
});

router.get('/:id', function (req, res, next) {
    pieRepo.getById(req.params.id, function (data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Successful",
                "data": data
            });
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The pie '" + req.params.id + "' could not be found",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The pie '" + req.params.id + "' could not be found"
                }
            });
        }
    }, function (err) {
        next(err);
    });
});

router.post('/', function (req, res, next) {
    pieRepo.insert(req.body, function (data) {
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "Successful",
            "data": data
        });
    }, function (err) {
        next(err);
    });
})
router.put('/:id', function (req, res, next) {
    pieRepo.getById(req.params.id, function (data) {
        if (data) {
            // Attempt to update the data
            pieRepo.update(req.body, req.params.id, function (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Pie '" + req.params.id + "' updated.",
                    "data": data
                });
            });
        }
        else {
            res.status(404).send({
                "status": 404,
                "statusText": "Not Found",
                "message": "The pie '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The pie '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err) {
        next(err);
    });
})
router.delete('/:id', function (req, res, next) {
    pieRepo.getById(req.params.id, function (data) {
        if (data) {
            // Attempt to delete the data
            pieRepo.delete(req.params.id, function (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "The pie '" + req.params.id + "' is deleted.",
                    "data": "Pie '" + req.params.id + "' deleted."
                });
            });
        }
        else {
            res.status(404).send({
                "status": 404,
                "statusText": "Not Found",
                "message": "The pie '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The pie '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err) {
        next(err);
    });
})

router.patch('/:id', function (req, res, next) {
    pieRepo.getById(req.params.id, function (data) {
      if (data) {
        // Attempt to update the data
        pieRepo.update(req.body, req.params.id, function (data) {
          res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "Pie '" + req.params.id + "' patched.",
            "data": data
          });
        });
      }
      else {
        res.status(404).send({
          "status": 404,
          "statusText": "Not Found",
          "message": "The pie '" + req.params.id + "' could not be found.",
          "error": {
            "code": "NOT_FOUND",
            "message": "The pie '" + req.params.id + "' could not be found."
          }
        });
      }
    }, function (err) {
      next(err);
    });
  })

app.use('/api/', router);

// Configure exception logger
app.use(errorHelper.logErrors);
// Configure client error handler
app.use(errorHelper.clientErrorHandler);
// Configure catch-all exception middleware last
app.use(errorHelper.errorHandler);


const PORT = 4000
app.listen(PORT, () => {
    console.log('Listening on port ${PORT}')
})