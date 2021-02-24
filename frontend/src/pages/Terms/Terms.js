// MENTIONS LEGALES

// imports
import React, {Fragment} from "react";
import './Terms.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Terms() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <Fragment>
            <Header avatar={'http://localhost:3001/' + user.avatar}/>
            <main className="mainTerms">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac sem ac nibh faucibus dignissim a
                    non justo. Vestibulum sit amet nisi diam. Cras ullamcorper ligula a nulla egestas, a porttitor elit
                    interdum. Donec varius semper leo vitae tristique. Mauris sit amet aliquet enim. Maecenas tincidunt
                    augue id mi sodales suscipit. Etiam vulputate viverra imperdiet.
                </p>

                <p>Vivamus id porttitor erat, id elementum odio. Duis sollicitudin, nisi tincidunt pharetra mollis,
                    velit sem mattis metus, vitae auctor erat est quis turpis. Class aptent taciti sociosqu ad litora
                    torquent per conubia nostra, per inceptos himenaeos. In sit amet euismod lectus. Ut euismod
                    consequat ligula, at luctus odio. Praesent id metus id lorem pharetra imperdiet sed consectetur
                    neque. Etiam ultrices sodales nisl, et commodo quam malesuada at.
                </p>

                <p>Fusce porttitor pretium lectus et consequat. Fusce blandit justo id tincidunt cursus. Fusce in leo
                    metus. Ut porttitor et tellus feugiat rhoncus. Morbi in diam sit amet ipsum scelerisque efficitur.
                    Ut ex arcu, pharetra et purus ut, ornare efficitur enim. Maecenas tempus odio dolor, eget lobortis
                    tortor aliquam sit amet. Fusce at augue purus. Curabitur quis viverra libero, ut laoreet ex.
                    Vestibulum a enim ut lorem ullamcorper laoreet. Interdum et malesuada fames ac ante ipsum primis in
                    faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    Phasellus luctus sem in molestie commodo.
                </p>

                <p>Duis libero ex, dignissim et lacinia ac, rhoncus quis neque. Curabitur a nisi quis elit vehicula
                    malesuada sit amet at orci. Curabitur luctus arcu id hendrerit congue. Donec eget diam dui. Donec
                    rhoncus porttitor volutpat. Curabitur vel rutrum tellus. Nullam varius nunc erat, dapibus lacinia ex
                    interdum non. Vivamus mattis mollis magna, et tincidunt nisi molestie sed. Cras pretium ex ipsum, ut
                    porta turpis sodales a. Etiam eu ante tempor, aliquam ex in, hendrerit elit. Sed non tempus arcu,
                    sed interdum augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                    curae; Nam nunc quam, convallis ut lectus ut, tincidunt euismod nisl. Aenean sit amet odio sapien.
                </p>

                <p>Integer dictum consectetur feugiat. Duis lacinia leo nec augue bibendum dapibus. Sed vestibulum
                    vehicula ligula ac dapibus. Curabitur euismod aliquet consectetur. Pellentesque at eleifend dui,
                    vitae maximus nisi. Nullam a rhoncus elit. Nam gravida feugiat scelerisque. Fusce suscipit lacinia
                    est, id mollis magna pellentesque non. Morbi consectetur vestibulum neque a iaculis. Morbi non massa
                    mauris. Morbi tincidunt vestibulum tristique. Fusce non leo orci. Sed scelerisque ligula vel elit
                    sollicitudin, eleifend posuere arcu posuere. Suspendisse viverra pellentesque neque vitae fermentum.
                    Curabitur lectus sem, pharetra in turpis eu, facilisis consequat ipsum. Donec mattis cursus neque,
                    mattis elementum neque viverra eget.
                </p>

                <p>Maecenas neque massa, dictum quis semper eu, ultrices in ante. Vivamus at porttitor massa, sed
                    blandit diam. Maecenas porttitor pulvinar ex, in facilisis velit ultricies vel. Proin non eros et
                    nibh blandit pretium. Suspendisse accumsan arcu sit amet tellus sollicitudin placerat. Aliquam sed
                    dolor libero. Vestibulum egestas velit vitae turpis gravida, non pulvinar dolor tincidunt. Nullam
                    vulputate quam sit amet felis mollis cursus. Vestibulum ultrices est convallis ligula vulputate
                    dignissim. Cras nisl tortor, dignissim vitae sollicitudin eu, tempor at augue. Nullam pellentesque
                    ligula tellus, tempor volutpat turpis euismod posuere. Maecenas blandit urna id ipsum sodales, a
                    luctus dui suscipit. Fusce viverra tempor ipsum, at ornare tortor fringilla vel. Cras sapien purus,
                    pretium a sodales nec, viverra nec erat. Curabitur sed ex blandit, efficitur arcu ut, feugiat ante.
                </p>

                <p>Donec lobortis dolor blandit pretium dapibus. Vivamus blandit nulla eget dictum rhoncus. Nulla
                    pharetra sagittis molestie. Pellentesque mollis vel sem sodales posuere. Phasellus pretium
                    vestibulum velit at convallis. Donec faucibus dui facilisis velit ornare, at sodales ipsum
                    pellentesque. Ut ornare, lectus id consequat porttitor, orci metus venenatis mauris, sed tempus
                    turpis elit ut nunc. Pellentesque condimentum et libero eget sagittis. Curabitur auctor, lacus et
                    fringilla ornare, augue felis sodales velit, id dictum magna massa sed erat.
                </p>

                <p>Integer id mattis ipsum, sit amet semper magna. Morbi mollis tellus massa, sed porttitor augue
                    posuere a. Sed in urna massa. Nulla bibendum, massa quis tempor consequat, turpis ex scelerisque
                    est, vel lobortis enim metus euismod dui. Sed cursus, ligula eget efficitur sodales, nisi elit
                    maximus nulla, eu bibendum turpis sem ac sapien. Quisque a mattis lorem. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames ac turpis egestas.
                </p>

                <p>In vitae pellentesque arcu. Vivamus hendrerit accumsan nisl, quis pharetra dui dignissim eget. Etiam
                    tempor tortor vehicula venenatis suscipit. Vestibulum et commodo eros. Morbi malesuada nisl libero,
                    nec congue risus consequat at. Quisque commodo, lorem a sodales tincidunt, purus nibh viverra lorem,
                    et varius erat nisi bibendum sapien. Quisque dictum orci a efficitur condimentum. Morbi ut finibus
                    ligula. Mauris nisi mauris, imperdiet vitae risus ac, rhoncus congue leo. Sed finibus finibus
                    eleifend. Aenean sit amet tempor nisl.
                </p>

                <p>Morbi ac sem dui. Phasellus tincidunt nibh nibh, at iaculis tortor maximus ut. Aliquam facilisis,
                    tellus hendrerit fringilla auctor, nisi elit elementum libero, sit amet suscipit leo odio
                    condimentum ligula. Fusce pellentesque non leo non pulvinar. Pellentesque ac fringilla eros.
                    Vestibulum a turpis in arcu suscipit luctus vel et arcu. Sed dictum placerat mauris ut porttitor.
                    Quisque at eros lorem. Integer sollicitudin purus at neque consequat, et iaculis felis sollicitudin.
                    Nullam rutrum diam aliquet nisl fermentum auctor. Proin et enim turpis.
                </p>

                <p>Fusce ultrices gravida diam rhoncus elementum. Mauris justo eros, rutrum sit amet dolor a, luctus
                    ullamcorper ipsum. Aliquam iaculis libero at purus lobortis, vel lobortis erat lacinia. Aenean
                    egestas sollicitudin arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                    inceptos himenaeos. Duis nisi arcu, dignissim a dictum eget, faucibus ut nisi. Donec faucibus justo
                    ac elit placerat ornare. Nunc in egestas nisi. Maecenas pulvinar tincidunt neque ut cursus. Etiam
                    ante arcu, aliquam vitae turpis nec, fermentum porttitor arcu. Donec ullamcorper massa vitae
                    consequat facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis ante
                    eget laoreet bibendum. In vestibulum dui elit, vitae accumsan tortor convallis ut. Duis lobortis
                    venenatis velit. Aliquam quis ante elementum, sodales arcu non, suscipit eros.
                </p>

                <p>Pellentesque vitae leo at velit lacinia viverra. Proin non facilisis libero, non iaculis erat. Proin
                    purus ante, dictum at nunc non, mattis pellentesque ligula. Quisque ac nunc eget mauris rutrum
                    elementum vel quis nisl. Duis sit amet enim ipsum. Pellentesque sodales scelerisque urna ut sodales.
                    Quisque gravida posuere nisi eget interdum. Fusce nec sollicitudin nunc.
                </p>

                <p>Nullam mauris velit, vulputate ut turpis porta, consectetur egestas mi. Sed in elit sed mi dignissim
                    iaculis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    Proin lectus leo, volutpat quis tempor sit amet, ornare et ante. Curabitur tincidunt consequat
                    ultrices. Cras finibus posuere sapien nec ultricies. Fusce sagittis scelerisque justo sed commodo.
                    Donec placerat lorem quis auctor sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nam lacinia sed est eu viverra. In vulputate massa ac finibus condimentum. Maecenas in turpis
                    lacinia, cursus ex et, tempor tellus. Suspendisse ultricies dignissim suscipit. Morbi vulputate
                    fringilla dui, eu interdum ipsum efficitur id. Vivamus aliquam elit eu euismod condimentum.
                </p>

                <p>Cras ac enim nec ante ullamcorper laoreet quis sit amet urna. Ut tincidunt eros in nunc congue
                    lacinia. Praesent aliquet nunc ut auctor pharetra. Pellentesque lobortis ligula a lacus ultricies
                    tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
                    egestas. Nulla ac augue quam. Mauris fermentum sodales pharetra. Praesent fringilla, felis eu
                    euismod volutpat, erat quam ornare ipsum, ut pulvinar arcu metus ac leo. Quisque hendrerit, lorem
                    sed dignissim placerat, ipsum massa molestie felis, id vehicula ante sapien nec eros. Sed elementum
                    justo et sem tristique, non hendrerit mi varius. Sed at odio suscipit, viverra urna eu, consequat
                    lacus.
                </p>

                <p>Sed facilisis interdum urna in pellentesque. Morbi et nisi in neque viverra faucibus et at sem.
                    Aliquam accumsan arcu felis, et viverra magna volutpat nec. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus. Vestibulum id semper libero. Donec pulvinar justo elit, non eleifend metus
                    suscipit vel. Donec diam purus, ullamcorper in vestibulum quis, blandit quis mauris. Vivamus viverra
                    dapibus nisi, et dictum ipsum rutrum ut. In hac habitasse platea dictumst. Integer imperdiet vitae
                    mi vel rhoncus. Etiam quis scelerisque justo. Donec orci leo, dignissim in mollis id, aliquam vitae
                    diam. Pellentesque nec metus egestas, egestas ipsum sit amet, lacinia nibh.
                </p>
            </main>

            <Footer/>
        </Fragment>
    )
}

export default Terms;
