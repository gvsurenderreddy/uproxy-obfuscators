uProxy obfuscation
==================

The uProxy obfuscation layer provides resistance against large-scale DPI attempts to passively detect uProxy.

This obfsucation layer does not protect against active adversaries, or adversaries that can throw expensive resources (such as people) at identifying connection properties.

Building
--------

The process of building this library is complex enough to require a Vagrant script. So far, we've only had success building this module on a 32-bit Linux guest system.

### Required software 

* Vagrant: https://vagrantup.com/
* Ubuntu Vagrant image: https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-i386-vagrant-disk1.box

### Add an Ubuntu 14.04 32-bit vagrant box

```shell
vagrant box add ubuntu-14.04-i386 https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-i386-vagrant-disk1.box
```

### Install the vagrant vbguest plugin

```shell
vagrant plugin install vagrant-vbguest
```

### Run the vagrant script

```
cd vagrant 
vagrant up
```

wait roughly 1-2 hours, then

```shell
$ ls build/html/
benchmark.fte.html  benchmark.rabbit.html  js
$ ls build/html/js/
benchmark.data.js  benchmark.fte.js  benchmark.rabbit.js  common.js  transformer.js transformer.fte.js transformer.rabbit.js
```

Example Usage
-------------

### FTE

Include the following scripts on your page.

```html
<!-- Provides str2ab and ab2str functions. -->
<script src="js/common.js"></script>
<!-- Provides the emscripten-compiled FteTransformer. -->
<script src="js/transformer.fte.js"></script>
<!-- Provides the generic Transformer API. -->
<script src="js/transformer.js"></script>
```

Then one can invoke the FTE transformer as follows.

```javascript
var transformer = new Transformer();

var key = new Uint8Array(16);
for (var i = 0; i < 16; i++) {
  key[i] = 0xFF;
}
transformer.setKey(key);
        
// The plaintext_dfa and ciphertext_dfa strings are AT&T-formatted DFAs.
// The plaintext_max_len and ciphertext_max_len are the largest strings
//   we'll encrypt/decrypt.
var jsonObj = {
  'plaintext_dfa': plaintext_dfa,
  'plaintext_max_len': plaintext_max_len,
  'ciphertext_dfa': ciphertext_dfa,
  'ciphertext_max_len': ciphertext_max_len
};
        
var json_str = JSON.stringify(jsonObj);
var ab_json_str = str2ab8(json_str);
transformer.configure(ab_json_str);

var ab_plaintext = str2ab(input_plaintext);
var ciphertext = transformer.transform(ab_plaintext);
var ab_output_plaintext = transformer.restore(ciphertext);
var output_plaintext = ab2str(ab_output_plaintext);
```

### Rabbit

Include the following scripts on your page.

```html
<!-- Provides str2ab and ab2str functions. -->
<script src="js/common.js"></script>
<!-- Provides the emscripten-compiled RabbitTransformer. -->
<script src="js/transformer.rabbit.js"></script>
<!-- Provides the generic Transformer API. -->
<script src="js/transformer.js"></script>
```

Then one can invoke the Rabbit transformer as follows.

```javascript
var transformer = new Transformer();

var key = new Uint8Array(16);
for (var i = 0; i < 16; i++) {
  key[i] = 0xFF;
}
transformer.setKey(key);

var ab_plaintext = str2ab(input_plaintext);
var ciphertext = transformer.transform(ab_plaintext);
var ab_output_plaintext = transformer.restore(ciphertext);
var output_plaintext = ab2str(ab_output_plaintext);
```
