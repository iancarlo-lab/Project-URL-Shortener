var express = require('express');
var app = express();
var html = app.use(express.static('views'));
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const urlRegex = require('url-regex');
const cors = require('cors');

mongoose.connect("mongodb+srv://<user>:<password>@cluster0-cerfm.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });

app.use(express.json());
app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(bodyParser.json());
app.use(cors());

var Schema = mongoose.Schema;
var urlSchema = new Schema({
    original_url: String,
    short_url: String
});
var Url = mongoose.model('Url', urlSchema);

var baseUrl = 'glitch.com/~motley-elderberry/';


//var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
//var regex = new RegExp("(http|ftp|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?")
app.get('/', (req,res) => {
    res.send(html)
});

app.get('/api/shorturl/new/:url', (req, res) => {

    var longUrl = req.params.url;
    var result = urlRegex().test(longUrl);
    var reservedNumber = generateShortNum();

    if(result === true){
    var newUrl = new Url({
        original_url: longUrl,
        short_url: baseUrl+reservedNumber,
    });
        newUrl.save(function(err,data){
            if(err){
                console.log(err)
                res.status(500).send(err);
            }else{
             res.send(data);
            }
        });
    }
    else{
            res.send({error: 'Invalid URL'})
        }
   
});


app.get('/api/:shortid', cors(), function(req, res) {
    var short = req.body.shortid;
    //var shortUrl = short.toString()
    console.log(short)

        //Url.findOne({'short_url': short}, function(err,data){
           // if(err) return (err)
            //if(data == null){
            //    res.status(404).send('Provided URL not found in our data base')
           // }
            //else{

            res.redirect(302, '/')
        //}

    //});
});

function tryOne(name){
    console.log('Ready to hack Mr: ' + name);

}
tryOne('Ian Carlooo')

reservedNum = [0,1]
function generateShortNum(){
    var randomNum = 0;
    do {
        randomNum = Math.floor(Math.random()*1000);
    }
    while(reservedNum.indexOf(randomNum) > -1)

    return(randomNum)
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
