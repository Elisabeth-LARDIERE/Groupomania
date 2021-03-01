// PUBLICATION D'UN NOUVEL ARTICLE

// imports
import React, {Fragment} from "react";
import Header from '../../components/Header/Header';
import './CreateNewPost.css'
import {createPostRequest} from "../../utils/Api";
import {Editor} from "@tinymce/tinymce-react";
import Footer from "../../components/Footer/Footer";
import Aside from "../../components/Aside/Aside";

class CreateNewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // initialisation de l'état du composant : titre et contenu vides
            title: "",
            content: "",
            width: window.innerWidth, // largeur de l'écran = largeur actuelle
            location: window.location // localisation = localisation actuelle
        }
        this.handleResize = this.handleResize.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleSubmitPost = this.handleSubmitPost.bind(this);
    }

    handleResize() { // au changement de largeur de l'écran
        this.setState({ // nouvel état : largeur => largeur actualisée
            width: window.innerWidth
        })
    }

    handleChangeTitle(event) { // à la saisie de caractères dans le champ titre
        this.setState({ // nouvel état : le titre prend la valeur des caractères saisis
                [event.target.name]: event.target.value
            }
        )
    }

    handleEditorChange(content) { // à la saisie de caractères dans l'éditeur de texte
        this.setState({content}) // nouvel état : le contenu prend la valeur des caractères saisis
    }

    handleSubmitPost(event) { // à la soumission de l'article
        event.preventDefault();
        createPostRequest(this.state.title, this.state.content) // appel de la requête de la création d'un nouvel article
            .then(() => { // si requête ok : redirection "accueil"
                window.location.href = "/home";
                alert("Votre article a bien été publié !");
            })
            .catch(error => { // si échec requête
                this.setState({error});
            })
    }

    render() {
        window.addEventListener('resize', this.handleResize); // écoute du changement de largeur de l'écran
        const renderAside = () => { // fonction d'affichage du aside selon la largeur de l'écran
            if (this.state.width > 1279) {
                return (
                    <Aside location={this.state.location}/>
                )
            } else {
                return null
            }
        }
        const user = JSON.parse(localStorage.getItem('user'));
        return (
            <Fragment>
                <Header avatar={'http://localhost:3001/' + user.avatar}/>
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
                                           onChange={this.handleChangeTitle}/>
                                </div>

                                <form>
                                    <Editor className="editor" name="content" value={this.state.content}
                                            onEditorChange={this.handleEditorChange}
                                            apiKey="w70adzec8zmy4avbouw9g5rg2yzn162jccapis8uqdc1ln67"
                                            init={{ // configuration de l'éditeur de texte
                                                content_style: "body {color: #181E56;}" + ".tox-tinymce-aux {zIndex: 0;}",
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

                                                toolbar: [
                                                    'undo redo | bold italic underline | fontsizeselect forecolor backcolor | alignleft aligncenter alignright alignjustify | link | emoticons | charmap | bullist numlist outdent indent | help'
                                                ]
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

                    {renderAside()}
                </main>

                <Footer/>

            </Fragment>
        )
    }
}

export default CreateNewPost;
