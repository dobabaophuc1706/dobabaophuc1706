new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "デート2",
          artist: "RADWIMPS ",
          cover: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/img/date2.jpg",
          source: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/mp3/date2.mp3",
          url: "https://www.youtube.com/watch?v=dMJc6kalUCM",
          favorited: false
        },
        {
          name: "Some where only we know",
          artist: "Rhianne cover",
          cover: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/img/somewhereonlyweknow.jpg",
          source: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/mp3/somewhereonlyweknow.mp3",
          url: "https://www.youtube.com/watch?v=Sjq_1WRyNBo",
          favorited: false
        },
        {
          name: "Chanh long thuong co",
          artist: "Huy Vac",
          cover: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/img/chanhlongthuongco.jpg",
          source: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/mp3/chanhlongthuongco.mp3",
          url: "https://www.youtube.com/watch?v=CBlt7nwGybQ",
          favorited: false
        },
        {
          name: "Thay toi yeu co ay",
          artist: "Thanh Hung",
          cover: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/img/thaytoiyeucoay.jpeg",
          source: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/mp3/thaytoiyeucoay.mp3",
          url: "https://www.youtube.com/watch?v=BGAtgfyPkPA",
          favorited: false
        },
        {
          name: "Ngay em dep nhat",
          artist: "Tama x Bell",
          cover: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/img/ngayemdepnhat.jpg",
          source: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/mp3/ngayemdepnhat.mp3",
          url: "https://www.youtube.com/watch?v=mnQMvKnvEKs",
          favorited: false
        },
        {
          name: "Hoa co lau",
          artist: "Phong Max x RIN",
          cover: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/img/hoacolau.jpg",
          source: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/mp3/hoacolau.mp3",
          url: "https://www.youtube.com/watch?v=rBjf1PmbXLo",
          favorited: false
        },
        {
          name: "Nhu anh da thay em",
          artist: "PhucXp x Orinn",
          cover: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/img/nhuanhdathayem.jpg",
          source: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/mp3/nhuanhdathayem.mp3",
          url: "https://www.youtube.com/watch?v=UcAhJQBjX7Q",
          favorited: false
        },
        {
          name: "Dao Nuong",
          artist: "Lofi",
          cover: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/img/daonuong.jpg",
          source: "https://raw.githubusercontent.com/dobabaophuc1706/dobabaophuc1706.github.io/main/music/mp3/daonuong.mp3",
          url: "https://www.youtube.com/watch?v=t5zPYuo310M",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
