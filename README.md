# faction-GSM
Faction distributed online network game servers

<h2>What is Distributed Online Network Game Servers ?</h2>
<p>Distrubted Online Network Game Servers is a node JS application designed to manage multiple game servers easily.
The application is aimed primarily at minecraft, Terraria, and games of that nature. Users of this software can
install it on an older desktop or laptop computer and load their gameservers into the system. There are roles and
permissions that will limit what individual users and players can do to their servers. Regular players will be
able to login and start and stop servers they would like to play. </p>

<h3>File Structure</h3>
<strong>Files</strong>
<p>app.js - Main file. Contains the server and is the server side of our app.</p>
<p>gulpfile.js - Compiler. Run gulp to compile our scripts and styles, as well as lint our files for errors in syntax.</p>
<p>package.json - The package. Contains which modules we depend on.</p>
<strong>Directories</strong>
<p>config - Config files.</p>
<p>core - Node JS files. Server-side JS such as authentication and database communication.</p>
<p>gameServers - Game servers. Container for the game servers. (Not included in the repo. Created afterward.)</p>
<p>lib - External depedencies. Libraries that are not include in node_modules folder.</p>
<p>models - JS models. Used by the views to communicate with the controllers.</p>
<p>node_modules - Module dependencies. Obtained by running 'npm install'.</p>
<p>styles - SCSS files. Style files that affect the entire project. (Most styles will be handled inline for each React component.)</p>
<p>views - JSX view files. Views that are rendered as html and sent to the client.</p>
<p> - components - JS view files. These are React components that act as our scripts.</p>


<h3>Branches</h3>
<p>master - main branch where all functions are pulled in.</p>
<p>logins - login branch contains the working code for login and suthentication functionality</p>
<p>minecraftLAuncher - this branch contains the working directory for functions that start and stop.</p>

<h2>Modules used</h2>
<ul>
<li>Express</li>
<li>Backbone</li>
<li>browserify</li>
<li>Passport</li>
<li>MySQL</li>
<li>React</li>
</ul>
