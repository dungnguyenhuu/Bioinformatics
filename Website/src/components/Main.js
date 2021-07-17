import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import apiRoutes from '../routes/apis';

function ResultComponent(props) {
  const [results, setResults] = useState([]);

  return (<table>
    <thead>
      <tr>
        <th style={{ fontWeight: 'bold' }}>ID</th>
        <th style={{ fontWeight: 'bold' }}>Kết quả</th>
      </tr>
    </thead>
    <tbody>
      {props.results.map(item => <tr key={item[0]}>
        <td>{item[0]}</td>
        <td>{item[1]}</td>
      </tr>)}
    </tbody>
  </table>);
}

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      file: null,
      predictingAcr: '',
      showingResults: false,
      textInfo: ''
    };

    this.documentInput = React.createRef();
  }

  predictAcr = async (e) => {
    e.preventDefault();
    const file = this.state.file;
    if (file !== null) {
      const formData = new FormData();
      formData.append('file', file);
      const { acr } = apiRoutes;
      const response = await axios.post(acr, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);

      if (
        response &&
        response.status === 200 &&
        response.data.status === 'SUCCESS'
      ) {
        const results = response?.data?.data ?? [];
        const count = results.length;
        let countAcr = 0;
        for (const r of results) {
          if (r[1] === '1') countAcr++;
        }

        this.setState({
          showingResults: true,
          textInfo: `Total: ${count} protein, ${countAcr} positive & ${count - countAcr} negative`,
          predictingAcr: results,
        });
      }
    } else {
      console.log('fail');
    }
  }

  onChangeFile = (e) => {
    if (e.target.files[0]) {
      const fr = new FileReader();
      const me = this;
      fr.onload = function () {
        me.setState({ content: fr.result });
      }
      fr.readAsText(e.target.files[0]);

      this.setState({
        file: e.target.files[0]
      })
    }

  }

  changeContent = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  resetFile = () => {
    this.setState({
      file: null,
      content: '',
      showingResults: false,
    });
  };

  render() {
    return (
      <main>
        {
          <section className="input-section">
            <h3 className="input-section__title">Chọn file định dạng fasta</h3>
            <form id="form-upload" onSubmit={this.predictAcr} encType="multipart/form-data">
              <input type="file" id="input-file" name="input_file" onChange={this.onChangeFile}></input>
              <textarea
                placeholder="Nội dung file"
                rows={15}
                resizable="false"
                disabled
                value={this.state.content}
                onChange={this.changeContent}
                ref={this.documentInput}
              ></textarea>
              {!this.state.showingResults &&
                <button
                  type="submit"
                  className="button"
                  style={{ width: '100%' }}
                >
                  Dự đoán
                </button>}
            </form>
          </section>
        }

        {this.state.showingResults && (
          <section className="results-section">
            <h3>{this.state.textInfo}</h3>
            <br/>
            <div className="results">
              <ResultComponent results={this.state.predictingAcr} />
              <button className="button" style={{ position: 'relative', marginTop: '9rem' }} onClick={this.resetFile}>
                <i className="fas fa-redo"></i>&nbsp;&nbsp;Thử lại với file
                khác
              </button>
            </div>
          </section>
        )}
        {/* 
        <section className="samples-section">
          <h3 className="samples-section__title">File mẫu</h3>

          <div className="samples">
            {this.state.samples.map((sample) => (
              <Sample
                sample={sample}
                key={sample.id}
                onSelect={() => this.selectSample(sample.id)}
              />
            ))}
          </div>
        </section> */}
      </main>
    );
  }
}



export default Main;
