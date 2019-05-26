import React, {Component} from 'react';
import {Flex, FlexItem} from '@instructure/ui-layout';
import {Heading} from '@instructure/ui-elements';
import {Img} from '@instructure/ui-elements';
import moment from 'moment';
import numeral from 'numeral';
import styles from './Sheet.js';
import {IconEyeLine} from '@instructure/ui-icons';
import {IconLikeLine} from '@instructure/ui-icons';
import {Pagination} from '@instructure/ui-pagination';
import EmbedButton from './EmbedButton';
import {Button} from '@instructure/ui-buttons';
import { IconInfoLine } from '@instructure/ui-icons';
import VideoStats from './VideoStats'

class SearchResult extends Component {
  state = {};
  styles = new styles();
  page = this.props.page;

  componentDidUpdate() {
    if(this.props.page != this.page) {
      this.page = this.props.page
      window.scrollTo(0, 0);
    }
  }

  showDetail = result => {
    if(this.state.key == result.etag) {
      this.setState({
        key: '',
      });
    } else {
      this.setState({
        key: result.etag,
      });
    } 
  };

  calcPercent = ({likeCount, dislikeCount}) => {
    const likes = parseInt(likeCount);
    const dislikes = parseInt(dislikeCount);
    return likes/(likes+dislikes)*100;
  }

  render() {
    let min = this.props.page * this.props.resultsPerPage;
    let max = this.props.resultsPerPage * (this.props.page + 1) - 1;
    max = max >= this.props.length ? this.props.length - 1 : max;

    return this.props.result.map((result, index) => {
      const percent = this.calcPercent(result.statistics)
      return index >= min && index <= max ? (
        <div
          style={
            this.state.key == result.etag
              ? this.styles.detailedCard
              : this.styles.resultCard
          }
          key={result.etag}
        >
          <Flex
            justifyItems="space-between"
            margin="large none x-small none"
            direction="column"
          >
            <FlexItem padding="medium" align="center">
              {this.state.key == result.etag ?
              <iframe width="510" height="315" src={`https://www.youtube.com/embed/${result.id}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> 
              : 
              <Img
                src={result.snippet.thumbnails.medium.url}
                alt="Image not found."
                style={{
                  borderRadius: '10px',
                }}
              /> }
              
            </FlexItem>
            <FlexItem padding="none medium none medium">
              <Heading level="h4">
                {result.snippet.title
                  .replace(/&#39;/g, "'")
                  .replace(/&quot;/g, '"')}
              </Heading>
              <p> 
                Published By:
                 <a 
                href={`https://www.youtube.com/channel/${
                  result.snippet.channelId
                }`}
                target="_blank"
                style = {this.styles.channelStyle}
                >
                 {' '}{result.snippet.channelTitle}
                </a>
              </p>
              <p>
                {moment(result.snippet.publishedAt, moment.ISO_8601).format(
                  'MMMM DD, YYYY',
                )}
              </p>
              <VideoStats percent={percent} stats={result.statistics} detailed={this.state.key == result.etag}/>
              <p style = {this.styles.overflowPrevention}>
                {this.state.key == result.etag ? result.snippet.description.substring(0, 611) + '...' : 
                  result.snippet.description.substring(0, 211) + '...'}
              </p>
            </FlexItem>
          </Flex>
          <Flex justifyItems = "end">
          <FlexItem padding="none none small x-small">
              <Button onClick={() => this.showDetail(result)} icon = {IconInfoLine}  margin="none none none medium">
                Details
              </Button>
            </FlexItem>
          <FlexItem padding = "none none small small">
            <EmbedButton
                onEmbed={this.props.onEmbed}
                videoId={result.id}
                title={result.snippet.title}
              />
          </FlexItem>
          </Flex>
        </div>
      ) : (
        ''
      );
    });
  }
}

export default SearchResult;
