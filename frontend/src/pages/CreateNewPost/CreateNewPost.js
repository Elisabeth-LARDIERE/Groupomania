//importations
import React, {Fragment} from "react";
import Header from '../../components/Header/Header';
import './CreateNewPost.css'
import {createPostRequest} from "../../utils/Api";
import {Editor} from "@tinymce/tinymce-react";

class CreateNewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleSubmitPost = this.handleSubmitPost.bind(this);
    }

    handleChange(event) {
        this.setState({
                [event.target.name]: event.target.value
            }
        )
    }

    handleEditorChange(content) {
        this.setState({content})
    }

    handleSubmitPost(event) {
        event.preventDefault();
        createPostRequest(this.state.title, this.state.content)
            .then(() => {
                window.location.href = "/home";
            })
            .catch(error => {
                this.setState({error});
            })
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <main className="mainNewPost">
                    <section className="newPostSection">
                        <div className="newPostTitleAndValidation">
                            <h1 className="newPostSectionTitle">Publier un article</h1>

                            <button className="newPostValidationButton button" type="submit"
                                    onClick={this.handleSubmitPost}>Valider
                                la publication
                            </button>
                        </div>

                        <div className="newPostBloc">
                            <div className="newPostBox">
                                <div className="newPostTitle">
                                    <label className="newPostTitleLabel" htmlFor="titre">Titre</label>
                                    <input className="newPostTitleInput" id="titre" name="title"
                                           value={this.state.title}
                                           onChange={this.handleChange}/>
                                </div>

                                <form>
                                    <Editor className="editor" name="content" value={this.state.content}
                                            onEditorChange={this.handleEditorChange}
                                            apiKey="w70adzec8zmy4avbouw9g5rg2yzn162jccapis8uqdc1ln67"
                                            init={{
                                                selector: 'textarea',
                                                height: 400,
                                                menubar: false,
                                                branding: false,
                                                forced_root_block: false,
                                                force_br_newlines: true,
                                                force_p_newlines: false,
                                                fontsize_formats: "8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 19pt 20pt 21pt 22pt 23pt 24pt 36pt",

                                                plugins: [
                                                    'textcolor',
                                                    'emoticons',
                                                    'autolink lists link',
                                                    'charmap  anchor help',
                                                ],

                                                toolbar:
                                                    'undo redo | bold italic underline | \
                                                    fontsizeselect forecolor backcolor| \
                                                    alignleft aligncenter alignright alignjustify | \
                                                    link | \
                                                    emoticons | charmap |\
                                                    bullist numlist outdent indent | help'
                                            }}
                                    />
                                </form>
                            </div>

                            <button className="newPostValidationButtonSmallDevices button" type="submit"
                                    onClick={this.handleSubmitPost}>Valider
                                la publication
                            </button>
                        </div>
                    </section>
                </main>

            </Fragment>
        )
    }
}

export default CreateNewPost;
