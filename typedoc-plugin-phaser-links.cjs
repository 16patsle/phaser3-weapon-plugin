// @ts-check

const baseLink = 'https://newdocs.phaser.io/docs/3.55.2/Phaser';

// Scene, Game, BlendModes
const knownTopLevel = [
    'Scene',
    'Game',
    'BlendModes'
]

const knownScopedObjects = {
    Animation: 'Animations',
    AnimationFrame: 'Animations',
    AnimationState: 'Animations',

    Camera: 'Cameras.Scene2D',

    DataManager: 'Data',

    BitmapMask: 'Display.Masks',
    GeometryMask: 'Display.Masks',

    EventEmitter: 'Events',

    Container: 'GameObjects',
    DisplayList: 'GameObjects',
    GameObject: 'GameObjects',
    Graphics: 'GameObjects',
    Group: 'GameObjects',
    Layer: 'GameObjects',
    Sprite: 'GameObjects',
    TransformMatrix: 'GameObjects.Components',

    Rectangle: 'Geom',

    Pointer: 'Input',

    Vector2: 'Math',

    Body: 'Physics.Arcade',

    PluginManager: 'Plugins',
    ScenePlugin: 'Plugins',

    WebGLPipeline: 'Renderer.WebGL',
    PostFXPipeline: 'Renderer.WebGL.Pipelines',
    
    Systems: 'Scenes',

    CanvasTexture: 'Textures',
    Frame: 'Textures',
    Texture: 'Textures',

    TimerEvent: 'Time',

    PlayAnimationConfig: 'Types.Animations',
    JSONGameObject: 'Types.GameObjects',
    HitAreaCallback: 'Types.Input',
    InteractiveObject: 'Types.Input',
    Vector2Like: 'Types.Math',
    Vector3Like: 'Types.Math',
    Vector4Like: 'Types.Math',
};


/**
 * @param {import('typedoc').Application} app
 */
exports.load = function load(app) {
    app.renderer.addUnknownSymbolResolver("phaser", name => {
        if (knownScopedObjects.hasOwnProperty(name)) {
            return `${baseLink}.${knownScopedObjects[name]}.${name}`;
        } else if (knownTopLevel.includes(name)) {
            return `${baseLink}.${name}`;
        }
        return undefined;
    });
}