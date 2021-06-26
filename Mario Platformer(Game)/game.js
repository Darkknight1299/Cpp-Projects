let config = {
    type: Phaser.AUTO, //typr of browser....computer or mobile

    scale:{
        mode: Phaser.Scale.FIT, //full screen or windowed etc.
        width: 800,
        height: 600,
    },

    backgroundColor: 0xffff11,

    physics:{
        default:'arcade', //arcade physics engine intiatised....defined by phaser
        arcade:{
            gravity:{
                y:1000, //more value more pull
            },
            debug:false, //gives boundary to objects...helps while designing
        },
    },

    audio: {
        disableWebAudio: true
    },

    scene:{
        preload: preload,
        create: create,
        update: update,
    }
};

let game = new Phaser.Game(config);

let player_config={
    player_speed:150,
    player_jumpspeed:-700,
}

function preload(){
    
    this.load.audio('theme', [
        'assets/audio/oedipus_wizball_highscore.ogg',
        'assets/audio/oedipus_wizball_highscore.mp3'
    ]);
    this.load.image("ground","Assets/topground.png");
    this.load.image("sky","Assets/background.png");
    this.load.image("apple","Assets/apple.png");
    this.load.image("ray","Assets/ray.png");
    this.load.spritesheet("dude","Assets/dude.png",{frameWidth: 32,frameHeight:48});//frame size of one node in the spritesheet
    this.load.spritesheet('fullscreen', 'assets/fullscreen.png', { frameWidth: 64, frameHeight: 64 });
}

function create(){
    W=game.config.width;
    H=game.config.height;

    var music = this.sound.add('theme');
    music.play();

    let ground = this.add.tileSprite(0,H-128,W,128,'ground'); //this is use to repeat multiple times
    ground.setOrigin(0,0); //done as default center is the middle of the image

    let background=this.add.sprite(0,0,'sky');
    background.setOrigin(0,0);
    background.displayWidth=W; //this can also be done to expand 
    background.displayHeigth=H;
    background.depth=-2; //done so that ground appears before sky

    //creating rays
    let rays=[];

    for(let i=-10;i<=10;i++){
        let ray=this.add.sprite(W/2,H-128,'ray');
        ray.displayHeight=1.5*H;
        ray.setOrigin(0.5,1);
        ray.alpha=0.2;
        ray.angle=i*20;
        ray.depth=-1;
        rays.push(ray);
    }
    //tween
    this.tweens.add({
        targets:rays,
        props:{
            angle:{
                value:"+=20",
            },
        },
        duration:6000,
        repeat:-1,
    })

    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    var button = this.add.image(800-16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();

        button.on('pointerup', function () {

            if (this.scale.isFullscreen)
            {
                button.setFrame(0);

                this.scale.stopFullscreen();
            }
            else
            {
                button.setFrame(1);

                this.scale.startFullscreen();
            }

        }, this);

        this.scoreText.setText('v15');

        var FKey = this.input.keyboard.addKey('F');

        FKey.on('down', function () {

            if (this.scale.isFullscreen)
            {
                button.setFrame(0);
                this.scale.stopFullscreen();
            }
            else
            {
                button.setFrame(1);
                this.scale.startFullscreen();
            }

        }, this);

    let fruits = this.physics.add.group({  //as we have to add many fruits
        key:"apple",
        repeat: 8,
        setScale:{x:0.2,y:0.2},
        setXY: {x:10,y:0,stepX:100}, //coordinates of first fruit and the distance between the each next fruit
    });
    fruits.children.iterate(function(f){
        f.setBounce(Phaser.Math.FloatBetween(0.4,0.7)); //adding random bounce to all fruits
    }) 

    //creating platforms
    let platforms = this.physics.add.staticGroup();
    platforms.create(500,350,'ground').setScale(2,0.5).refreshBody();//refreshBody to cahnge the box of the image>>>debug->true and remove it to see
    platforms.create(700,200,'ground').setScale(2,0.5).refreshBody();
    platforms.create(100,200,'ground').setScale(2,0.5).refreshBody();
    platforms.add(ground);

    this.player=this.physics.add.sprite(100,100,'dude',4);//selecting 4th frame to be shown by default and physics so that physics engine works on this .............this is used so that it can be accessed everywhere else
    this.player.setBounce(0.5);//this is elasicity....set as 1 and object will keep on bouncing
    this.player.setCollideWorldBounds(true); //so player doenot go out of bounds

    //animations
    this.anims.create({
        key:'left',
        frames:this.anims.generateFrameNumbers('dude',{start:0,end:3}),
        frameRate:10,
        repeat:-1,//unlimited
    })
    this.anims.create({
        key:'center',
        frames:[{key:'dude',frame:4}],
        frameRate:10,
    })
    this.anims.create({
        key:'right',
        frames:this.anims.generateFrameNumbers('dude',{start:5,end:8}),
        frameRate:10,
        repeat:-1,//unlimited
    })

    //Keyboard Movements
    this.cursors=this.input.keyboard.createCursorKeys();//standard function to take an input from keyboard
    
    this.physics.add.existing(ground,true);//so that physics applies to this as well....static-true(bydefault all dynamic....we could use below 2 lines as well)
    /*ground.body.allowGravity=false;//so that ground doesnt fall
    ground.body.immovable=true;//so that it keeps player above the ground and not move under any instance*/

    //collision detection
    this.physics.add.collider(platforms,this.player);
    //this.physics.add.collider(ground,fruits);   as ground added with platforms
    this.physics.add.collider(platforms,fruits);
    this.physics.add.overlap(this.player,fruits,eatFruit,null,this);//to eat the fruit...null is process callback optional attribute so given null

    //create camera 
    this.cameras.main.setBounds(0,0,W,H);
    this.physics.world.setBounds(0,0,W,H);//this can be bigger than game window

    //camera flow player
    this.cameras.main.startFollow(this.player,true,true);
    this.cameras.main.setZoom(1.5); //so that only small part visible

}

function update(){
    if(this.cursors.left.isDown){
        this.player.setVelocityX(-player_config.player_speed);
        this.player.anims.play('left',true);
    }
    else if(this.cursors.right.isDown){
        this.player.setVelocityX(player_config.player_speed);
        this.player.anims.play('right',true);
    }
    else{
        this.player.setVelocityX(0);
        this.player.anims.play('center'); //as only single frame
    }

    //add jumping
    if(this.cursors.up.isDown && this.player.body.touching.down){ //seconf condition to not jump when in air
        this.player.setVelocityY(player_config.player_jumpspeed);
    }
}

function eatFruit(player,fruit){
    fruit.disableBody(true,true);  //deactivate and hide....both true
    this.scoreText.setText('Mario Game');
}