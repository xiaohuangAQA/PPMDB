from django.shortcuts import render, reverse
from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.views.generic.base import View
from Bio.SeqUtils.ProtParam import ProteinAnalysis
from PPMDB import settings
from .utils import homeSearch, searchMore

# Create your views here.
html_dict = {'protein': 'protein.html', 'disease': 'disease.html', 'enzyme': 'enzyme.html',
                     'inhibitor': 'inhibitor.html', 'compound': 'compound.html'}
protein_letters = "ACDEFGHIKLMNPQRSTVWY"

def home(request):
    return render(request, 'home.html', {
        'hoStyle': "color:#09ffff !important;",
    })

class HomeSearch(View):
    @staticmethod
    def get(request):
        return HttpResponseRedirect(reverse('ppm:home'))

    @csrf_exempt
    def post(self, request):
        searchType = request.POST.get('searchType')
        searchTerm = request.POST.get('searchTerm', 'All')
        if searchTerm == '':
            searchTerm = 'ALL'
        res, count = homeSearch(searchType, searchTerm)
        return render(request, html_dict.get(searchType), {
            'seStyle': "color:#09ffff !important;",
            'dataset': res,
            'count': count
        })

class BrowseView(View):
    @staticmethod
    def get(request):
        return render(request, 'browse.html', {
            'brStyle': "color:#09ffff !important;",
            'title': 'Browse',
        })

    @csrf_exempt
    def post(self, request):
        searchType = request.POST.get('searchType')
        searchTerm = request.POST.get('searchTerm', 'All')
        res, count = homeSearch(searchType, searchTerm)
        return render(request, html_dict.get(searchType), {
            'brStyle': "color:#09ffff !important;",
            'dataset': res,
            'count': count,
            'type': 1
        })

class ContactView(View):
    @staticmethod
    def get(request):
        return render(request, 'contact.html', {'coStyle': "color:#09ffff !important;"})

    @csrf_exempt
    def post(self, request):
        return render(request, 'contact.html', {'msg': 'OK'})
        subject = "Deep-B3P Question: "
        name = "Name: " + str(request.POST.get('inputName'))
        email = "Email: " + str(request.POST.get('inputEmail'))
        message = "Message: " + str(request.POST.get('inputMessage'))
        msg = '\r\n'.join([name, email, message])
        send_mail(subject, msg, from_email=settings.EMAIL_HOST_USER,
                  recipient_list=["384767937@qq.com"])
        return render(request, 'contact.html', {'msg': 'OK'})


class showMore(View):
    @staticmethod
    def get(request):
        sType = request.GET.get('type')
        uid = request.GET.get('uid')
        if sType == 'protein':
            protein, ptase, dis = searchMore(sType, uid)
            seq = protein.sequence
            x = ProteinAnalysis(seq)
            pep_aac = x.get_amino_acids_percent()
            aac = []
            com = []
            for one in list(protein_letters):
                if pep_aac.get(one, 0) != 0:
                    aac.append(one)
                    com.append(round(pep_aac.get(one), 2))
            return render(request, 'show-more.html', {'protein': protein, 'ptase': ptase, 'dis': dis, 'aac': aac, 'com':com})
        if sType == 'enzyme':
            enzyme, total = searchMore(sType, uid)
            return render(request, 'show-enzyme.html', {'enzyme': enzyme, 'total': total})
        if sType == 'inhibitor':
            inhibitor, total = searchMore(sType, uid)
            return render(request, 'show-inhibitor.html', {'inhibitor': inhibitor, 'total': total})
        if sType == 'compound':
            return HttpResponse("OK")
        return HttpResponseRedirect(reverse('ppm:home'))

def statistics(request):
    return render(request, 'statistics.html', {'stStyle': "color:#09ffff !important;"})


def document(request):
    return render(request, 'statistics.html', {'doStyle': "color:#09ffff !important;"})

def updata():
    file = r'E:\database\PPMdb_data\PPMdb\Inhibitor.csv'
    import pandas as pd
    from .models import Inhibitor
    df = pd.read_csv(file, sep='\t')
    for index, row in df.iterrows():
        i_id = row['I_ID']
        e_id = row['E_ID_1']
        ptase = row['PTase']
        name = row['Name']
        state = row['State']
        drugbank_id = row['DrugBank ID']
        disease = row['disease ontology']
        DO_id = row['DOID']
        pubmed_id = row['PubMed ID']
        description = row['Description']
        enzyme = row['enzyme']
        obj = Inhibitor(
            i_id=i_id,
            e_id=e_id,
            enzyme_type=ptase,
            name=name,
            state=state,
            drugbank_id=drugbank_id,
            disease=disease,
            DO_id=DO_id,
            pubmed_id=pubmed_id,
            description=description,
            enzyme=enzyme
        )
        obj.save()
        print(i_id)