'use strict';

const Node = require('../../../index.js').Node;
const $ = require('jquery');

class BaseNode extends Node {
  constructor(opts) {
    super(opts);
  }
  mounted() {

    // 假如菱形的话定制锚点，可指定任意的dom为endopoint
    // console.log(this)
    if (this.options.shape === 'diamond') {
      let pointPos = ['top', 'right', 'bottom', 'left'];
      pointPos.forEach((pos, index) => {
        let point = $(`<div class='butterflie-circle-endpoint ${pos}'></div>`);
        $(this.dom).append(point);
        let obj = {
          id: `${pos}`,
          orientation: [pointPos.indexOf(pos) % 1 === 1 ? 1 : 0, pointPos.indexOf(pos) % 1 === 1 ? 0 : 1],
          dom: point[0]
        };
        if (pos === 'top') {
          obj.orientation = [0, -1];
        } else if (pos === 'right') {
          obj.orientation = [1, 0];
        } else if (pos === 'bottom') {
          obj.orientation = [0, 1];
        } else if (pos === 'left'){
          obj.orientation = [-1, 0];
        }
        this.addEndpoint(obj);
      });
    }

    // 把锚点添加颜色
    if (this.endpoints && this.endpoints.length > 0) {
      this.endpoints.forEach((point) => {
        $(point.dom).addClass(this.options.color);
      })
    }
  }
  draw = (data) => {
    let container = $('<div class="base-node"></div>')
      .css('top', data.top)
      .css('left', data.left)
      .css('width', data.options.width)
      .css('height', data.options.height)
      .attr('id', data.id);
    
    // 添加颜色
    if (data.options.color) {
      container.addClass(data.options.color);
    }

    // 添加外边框
    if (data.options.border) {
      container.addClass(data.options.border);
    }

    // 渲染外形
    container.addClass(data.options.shape);

    // 添加文字
    let textSpan = $(`<span class='text'>${data.options.text}</span>`);
    if (data.options.shape === 'diamond') {
      textSpan.addClass('rotate');
    }
    container.append(textSpan);

    return container[0];
  }
}

module.exports = BaseNode;
