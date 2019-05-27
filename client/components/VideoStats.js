import React, { Component } from 'react';
import {Flex, FlexItem} from '@instructure/ui-layout'
import numeral from 'numeral';
import {IconEyeLine} from '@instructure/ui-icons';
import {IconLikeLine} from '@instructure/ui-icons';

class VideoStats extends Component {
  styleRed = {
    width: Math.abs(this.props.percent-100)+"px",
    backgroundColor: 'red',
  }
  
  styleGreen = {
    width: this.props.percent+"px",
    backgroundColor: 'green',
  }
  
  render() {
    return(
      <div style={{maxWidth: '290px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {numeral(this.props.stats.viewCount).format('0.0a')}
          <IconEyeLine color="primary" />
          {numeral(this.props.stats.likeCount).format('0.0a')}
          <IconLikeLine color="primary"/>
          <div style={{display: 'inline-flex', height: '7.5px', position: 'relative', top: '5px'}}>
            <div style={this.styleGreen}></div>
            <div style={this.styleRed}></div>
          </div>
          <IconLikeLine color="primary" rotate="180"/>
          {numeral(this.props.stats.dislikeCunt).format('0.0a')}
        </div>
      </div>
    )
  }
}

export default VideoStats