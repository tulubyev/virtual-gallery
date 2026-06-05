{pkgs}: {
  deps = [
    pkgs.udev
    pkgs.at-spi2-core
    pkgs.xorg.libXrandr
    pkgs.xorg.libXfixes
    pkgs.xorg.libXext
    pkgs.xorg.libXdamage
    pkgs.xorg.libXcomposite
    pkgs.xorg.libX11
    pkgs.libxkbcommon
    pkgs.alsa-lib
    pkgs.mesa
    pkgs.expat
    pkgs.dbus
    pkgs.at-spi2-atk
    pkgs.atk
    pkgs.nss
    pkgs.nspr
    pkgs.glib
  ];
}
