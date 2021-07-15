var mongoose = require('mongoose'),
  Radio = mongoose.model('Radio');

exports.get = function(req, res) {
    Radio.find().then(radios => {
        return res.status(200).json(radios);
    });
};

exports.post = function(req, res) {
    const radio = new Radio({
      url: req.body.url,
      name: req.body.name,
      shortname: req.body.shortname,
    });

    radio
      .save(radio)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Radio."
        });
      });
};

exports.getId = function(req, res) {
    Radio.findOne({_id: req.params.id,})
        .then((radio) => {
            return res.status(200).json(radio);
        });
};
exports.update = function(req, res) {
  let radio = {}
  if (req.body.url) radio.url = req.body.url
  if (req.body.name) radio.name = req.body.name
  if (req.body.shortname) radio.shortname = req.body.shortname

  console.log(radio);

  Radio.findOne({_id: req.params.id})
  .then((rdio) => {
      rdio.url = radio.url ? radio.url : rdio.url;
      rdio.name = radio.name ? radio.name : rdio.name;
      rdio.shortname = radio.shortname ? radio.shortname : rdio.shortname;

      rdio.save().then(final => {res.json(final)})
      return res.status(200).json({ message: "Radio has been updated" });
  }).catch((err) => {
      console.log(err)
  })
};

exports.delete = function(req, res) {
    Radio.findOne({_id: req.params.id,})
        .then((radio) => {
            radio.deleteOne();
            return res.status(200).json({ message: "Radio has been deleted" });
        });
};