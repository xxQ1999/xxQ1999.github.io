<script src="/assets/js/APlayer.min.js"> </script>// Generated by CoffeeScript 1.4.0
(function() {
  var N, ProCon, func, procon;

  N = 10;

  func = function(a, b) {
    if (a == null) {
      a = 4;
    }
    if (b == null) {
      b = 6;
    }
    return a + b;
  };

  ProCon = (function() {

    function ProCon() {}

    ProCon.prototype.data = {
      mutex: 1,
      empty: N,
      full: 0,
      front: 0,
      rear: 0,
      buf: []
    };

    ProCon.prototype.init = function() {
      var i, newDom,
        _this = this;
      i = 0;
      while (i < N) {
        newDom = $('<div class="bufBox"><div class="bufCover">' + i + '</div>' + i + '</div>');
        $('#buf').append(newDom);
        this.data.buf.push('e');
        i++;
      }
      $('#produce').click(function() {
        return _this.producer();
      });
      return $('#consume').click(function() {
        return _this.consumer();
      });
    };

    ProCon.prototype.p = function(num) {
      return --num;
    };

    ProCon.prototype.v = function(num) {
      return ++num;
    };

    ProCon.prototype.produceItem = function() {
      $('<p class="desPro">生产了产品</p>').insertBefore($("#des p:first"));
      return 'm';
    };

    ProCon.prototype.consumeItem = function() {
      return $('<p class="desCon">消费了产品</p>').insertBefore($("#des p:first"));
    };

    ProCon.prototype.enterItem = function(item) {
      var str;
      this.data.front = (this.data.front + 1) % N;
      this.data.buf[this.data.front] = item;
      str = "存入产品" + this.data.buf[this.data.front] + "到缓冲区" + this.data.front;
      $("<p class="desPro">" + str + "</p>").insertBefore($("#des p:first"));
      return $($('.bufCover')[this.data.front]).animate({
        "height": "50px"
      });
    };

    ProCon.prototype.removeItem = function() {
      var str;
      this.data.rear = (this.data.rear + 1) % N;
      this.data.buf[this.data.rear] = 'e';
      str = "取出产品" + this.data.buf[this.data.rear] + "从缓冲区" + this.data.rear;
      $("<p class="desCon">" + str + "</p>").insertBefore($("#des p:first"));
      return $($('.bufCover')[this.data.rear]).animate({
        "height": "0px"
      });
    };

    ProCon.prototype.producer = function() {
      var item;
      if (this.data.full === N) {
        $("<p class="desSpe">缓冲区已全满</p>").insertBefore($("#des p:first"));
        return;
      }
      item = this.produceItem();
      this.data.empty = this.p(this.data.empty);
      this.data.mutex = this.p(this.data.mutex);
      this.enterItem(item);
      this.data.mutex = this.v(this.data.mutex);
      return this.data.full = this.v(this.data.full);
    };

    ProCon.prototype.consumer = function() {
      if (this.data.empty === N) {
        $("<p class="desSpe">缓冲区已空</p>").insertBefore($("#des p:first"));
        return;
      }
      this.data.full = this.p(this.data.full);
      this.data.mutex = this.p(this.data.mutex);
      this.removeItem();
      this.data.mutex = this.v(this.data.mutex);
      this.data.empty = this.v(this.data.empty);
      return this.consumeItem();
    };

    return ProCon;

  })();

  procon = new ProCon;

  procon.init();

}).call(this);
