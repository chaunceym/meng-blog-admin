import React, {PureComponent} from 'react'; //引入react
import PropTypes from 'prop-types';  //引入prop-types
import hljs from 'highlight.js'
import 'highlight.js/styles/dracula.css'  //代码块样式

class CodeBlock extends PureComponent {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this)
  }

  setRef(el) {
    this.codeEl = el
  }

  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.highlightCode()
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl)
  }

  render() {
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    )
  }
}

CodeBlock.defaultProps = {
  language: ''
};
CodeBlock.protoTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
};
export default CodeBlock;