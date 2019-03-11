import React, { PureComponent } from 'react'
import { FormControl, InputLabel, Input, IconButton, CircularProgress, LinearProgress, Badge } from '@material-ui/core'
import styles from './filefield.module.scss';
import { withStyles } from '@material-ui/core/styles';
import renderFromHelper from '../renderFromHelper';
import DragDrop from '../../../_assets/images/drag-and-drop-512.svg'
import Drop from '../../../_assets/images/drop-512.svg'
import classNames from 'classnames';
import Dropzone from 'react-dropzone'
import { connectTo } from '../../../_utils/generic';
import { addUploadFiles, removeUploadFiles, uploadStart } from '../../../_actions/upload'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FILEDOWNLOAD } from '../../../_constants/api';

class FileFieldForRender extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      preview: null,
      setfile: null,
      countFile: 0
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.countFile > 0)
      this.props.input.onChange(this.props.uploadedFiles.filter(file => file.field === this.props.input.name).map(file => file.url))
  }

  onDrop = (isFile) => (acceptedFiles, rejectedFiles) => {
    this.setState({ setfile: null, countFile: acceptedFiles.length })

    this.props.removeUploadFiles({ field: this.props.input.name })
    acceptedFiles.forEach(file => {
      this.props.addUploadFiles({ file: file,folder:this.props.folder, field: this.props.input.name })
      this.setState({ setfile: true })
      //file.name
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsDataURL = reader.result;
        this.setState({ preview: fileAsDataURL })
        // do whatever you want with the file content
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsDataURL(file);
    });
  }

  render() {
    const {
      input,
      label,
      folder,
      className,
      multiselect,
      isFile,
      progress,
      uploadStart,
      uploading,
      uploadedFiles,
      complate,
      failure,
      meta: { active, error, warning, touched },
      ...custom
    } = this.props
    const { preview, setfile } = this.state
    return (
      <div className={styles.container}>
        <Badge color="primary" badgeContent={this.state.countFile > 0 ? (this.state.countFile > 1 ? this.state.countFile : null) : (input.value && input.value.length > 1) ? input.value.length : null} className={styles.Badge}>
          <div>
            <Dropzone multiple={multiselect} onDrop={this.onDrop(isFile)}>
              {({ acceptedFiles, rejectedFiles, getRootProps, getInputProps, isDragActive }) => {
                return (
                  <div
                    {...getRootProps()}
                    className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}
                  >
                    <input {...getInputProps()} />
                    {
                      isDragActive ?
                        <div className={styles.dragactive}>
                          <span>{" انتخاب "}{label}</span>
                          <img src={Drop} alt="Logo" />
                        </div> :
                        <div className={styles.dragdeactive}>
                          <span>{" انتخاب "}{label}</span>
                          {(acceptedFiles.length === 1 && preview) ?
                            <img src={preview} alt="Logo" /> :
                            input.value && input.value.length === 1 ?
                              <img src={FILEDOWNLOAD(input.value[0])} alt="Logo" />
                              :
                              <img src={DragDrop} alt="Logo" />
                          }
                        </div>
                    }
                    {/* {
                      acceptedFiles.length > 1 &&
                      acceptedFiles.map(file => (
                        <li key={file.path}>
                          {file.path} - {file.size} bytes
                      {acceptedFiles.length === 1 && preview && <img src={preview} alt="Logo" />}
                        </li>
                      ))
                    }
                    {
                      rejectedFiles.map(file => (
                        <li key={file.path}>
                          {file.path} - {file.size} bytes
                    </li>
                      ))
                    } */}
                  </div>
                )
              }}
            </Dropzone>

            {setfile && !uploading &&
              <IconButton aria-label="Upload" onClick={() => uploadStart({afterCall:()=>{}})} >
                <FontAwesomeIcon icon="file-upload" size="xs" />
              </IconButton>
            }
            {setfile && uploading && !complate && !failure &&
              <div className={styles.progress}>
                {/* <span>{progress}</span> */}
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  size={24}
                  thickness={4}
                />
              </div>
            }
            {complate &&
              <FontAwesomeIcon className={styles.check} icon="check-circle" size="2x" />
            }
            {failure &&
              <FontAwesomeIcon className={styles.err} icon="exclamation-circle" size="2x" />
            }
          </div>
        </Badge>
      </div>
      // <FormControl className={className}>
      //   <InputLabel htmlFor={input.name}>{label}</InputLabel>
      //   <Input
      //     {...input}
      //     {...custom}
      //     type='text'
      //   />
      //   {renderFromHelper({ touched, error })}
      // </FormControl >
    )
  }
}

export default withStyles(styles)(connectTo(
  state => ({
    uploading: state.upload.uploading,
    progress: state.upload.progress,
    complate: state.upload.complate,
    failure: state.upload.failure,
    uploadedFiles: state.upload.uploadedFiles,
  }),
  { addUploadFiles, removeUploadFiles, uploadStart },
  FileFieldForRender)
)