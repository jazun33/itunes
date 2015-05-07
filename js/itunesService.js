var app = angular.module('itunes');

app.service('itunesService', function ($http, $q) {
    //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
    //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in
    //your controller need to be on 'this'.

    //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request
    //to a url that looks like this
    //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
    //Note that in the above line, artist is the parameter being passed in.
    //You can return the http request or you can make your own promise in order to manipulate the data
    //before you resolve it.

    //Code here
    this.getSongData = function(artist) {
        var deferred = $q.defer();
        $http({
            method: 'JSONP',
            url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
        }).then(function(response){
            response = response.data.results;
            response = parseSongs(response);
            deferred.resolve(response);
        });
        return deferred.promise;
    };

    var parseSongs = function(songs) {
        var finalSongs = [];
        for (var i = 0; i < songs.length; i++) {
            var correctData = {};
            correctData['Play'] = songs[i].previewUrl;
            correctData['Song'] = songs[i].trackName;
            correctData['Artist'] = songs[i].artistName;
            correctData['Collection'] = songs[i].collectionName;
            correctData['AlbumArt'] = songs[i].artworkUrl100;
            correctData['Type'] = songs[i].kind;
            correctData['IndividualPrice'] = songs[i].trackPrice;
            correctData['CollectionPrice'] = songs[i].collectionPrice;
            finalSongs.push(correctData);
        }
        return finalSongs;
    };
});