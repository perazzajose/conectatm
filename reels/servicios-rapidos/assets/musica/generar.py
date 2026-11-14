# Tema original generado por código para el reel "servicios-rapidos" (100 bpm, Do mayor, 21 s).
import numpy as np, sys
from scipy.io import wavfile
from scipy.signal import butter, lfilter
sr=44100; bpm=100; beat=60/bpm; dur=21.0
n=int(sr*dur); t=np.arange(n)/sr
rng=np.random.default_rng(7)
def f(m): return 440*2**((m-69)/12)
def env(length, a=0.005, d=0.25):
    x=np.arange(int(length*sr))/sr
    return np.minimum(x/a,1)*np.exp(-x/d)
def add(buf, start, sig, gain=1.0):
    i=int(start*sr)
    if i>=n: return
    sig=sig[:n-i]; buf[i:i+len(sig)]+=sig*gain
def lp(x, fc):
    b,a=butter(2, fc/(sr/2)); return lfilter(b,a,x)
# C  G  Am  F  (acordes por compás de 4 tiempos)
prog=[(48,[60,64,67,72]),(43,[59,62,67,71]),(45,[60,64,69,72]),(41,[60,65,69,72])]
bar=4*beat
pad=np.zeros(n); pluck=np.zeros(n); bass=np.zeros(n); kick=np.zeros(n); hat=np.zeros(n); clap=np.zeros(n)
nb=int(np.ceil(dur/bar))
for b in range(nb):
    root,ch=prog[b%4]; t0=b*bar
    L=int(bar*sr); x=np.arange(L)/sr
    e=np.minimum(x/0.25,1)*np.minimum((bar-x)/0.25,1)
    for m in ch[:3]:
        s=sum(np.sin(2*np.pi*f(m)*k*x+rng.uniform(0,6))/k**1.6 for k in (1,2,3))
        add(pad,t0,s*e,0.10)
    # arpegio en corcheas
    pat=[0,1,2,3,2,1,2,1]
    for i,p in enumerate(pat):
        m=ch[p]+12; l=0.45; x2=np.arange(int(l*sr))/sr
        s=(np.sin(2*np.pi*f(m)*x2)+0.35*np.sin(2*np.pi*2*f(m)*x2)+0.12*np.sin(2*np.pi*3*f(m)*x2))*env(l,0.004,0.16)
        add(pluck,t0+i*beat/2,s,0.22 if i%2==0 else 0.15)
    full = t0>=3.6-1e-6          # desde que aparece la solución entra la base
    if full:
        for i in range(4):
            x3=np.arange(int(0.3*sr))/sr
            k=np.sin(2*np.pi*(45*x3+ (110-45)*0.035*(1-np.exp(-x3/0.035))))*np.exp(-x3/0.11)
            add(kick,t0+i*beat,k,0.75)
            h=rng.standard_normal(int(0.06*sr))*np.exp(-np.arange(int(0.06*sr))/sr/0.012)
            add(hat,t0+i*beat+beat/2,h,0.10)
        for i in (1,3):
            c=rng.standard_normal(int(0.18*sr))*np.exp(-np.arange(int(0.18*sr))/sr/0.05)
            add(clap,t0+i*beat,c,0.10)
        for i,(off,l) in enumerate([(0,1.5*beat),(1.5*beat,0.5*beat),(2*beat,1.5*beat),(3.5*beat,0.5*beat)]):
            x4=np.arange(int(l*sr))/sr
            s=(np.sin(2*np.pi*f(root-12)*x4)+0.4*np.sin(2*np.pi*f(root)*x4))*np.minimum(x4/0.01,1)*np.exp(-x4/0.5)*np.minimum((l-x4)/0.02,1)
            add(bass,t0+off,s,0.30)
hat=lfilter(*butter(2,6000/(sr/2),'high'),hat)
clap=lfilter(*butter(2,[900/(sr/2),5000/(sr/2)],'band'),clap)
pad=lp(pad,2200); pluck=lp(pluck,5000)
# eco simple en el arpegio
d=int(0.75*beat*sr); echo=np.zeros(n); echo[d:]=pluck[:-d]*0.3
mono=pad+bass+kick+clap
L=mono+pluck+0.6*echo+hat*0.8; R=mono+0.8*pluck+echo+hat
mix=np.stack([L,R],1)
fade=np.ones(n); fo=int(1.6*sr); fade[-fo:]=np.linspace(1,0,fo)**1.5; fi=int(0.05*sr); fade[:fi]=np.linspace(0,1,fi)
mix*=fade[:,None]; mix=np.tanh(mix*1.1); mix/=np.abs(mix).max()/0.89
wavfile.write(sys.argv[1], sr, (mix*32767).astype(np.int16))
