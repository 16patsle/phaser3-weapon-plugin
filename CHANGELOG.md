# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2019-10-05
### Added
- Added a changelog

### Fixed
- Fix incorrect usage of eventEmitter (#16, thanks @milk-shake)

## [1.0.0] - 2019-04-15
### Added
- Added weapon config check that can warns you of potentially invalid configuration.
- Added example tho show the trackPointer functionality.

### Changed
- Added more comments to make the code easier to understand.
- Register the Weapon with the game object factory/creator. Now you can use `this.add.weapon`.

### Fixed
- Fixed several bugs, like incorrect usage of Rectangle.CenterOn.

[Unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/16patsle/phaser3-weapon-plugin/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/16patsle/phaser3-weapon-plugin/compare/v1.0.0-beta.1...v1.0.0